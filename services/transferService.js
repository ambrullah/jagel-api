const jagel = require("../utils/jagelClient");
const config = require("../config/jagel");

class TransferService {

    // ==========================
    // CEK USER TUJUAN
    // ==========================
    async checkUser(phone) {
        return await jagel.getUser(phone);
    }

    // ==========================
    // CEK DATA PENGIRIM (BY USERNAME)
    // ==========================
    async getUserByUsername(username) {
        return await jagel.getUserByUsername(username);
    }

    // ==========================
    // CEK SESSION PENGIRIM (Legacy)
    // ==========================
    async getSession(session) {
        return await jagel.getSession(session);
    }

    // ==========================
    // CEK SALDO BERDASARKAN USERNAME
    // ==========================
    async checkBalance(username) {
        return await jagel.checkBalanceByUsername(username);
    }

    // ==========================
    // TRANSFER
    // ==========================
    async transfer(data) {
        const {
            username,
            phone,
            amount,
            note
        } = data;

        const nominal = Number(amount);
        const adminFee = Number(config.biayaAdmin);
        const totalPembayaran = nominal + adminFee;

        // ==========================
        // 1. VALIDASI DATA PENGIRIM
        // ==========================
        const sender = await this.getUserByUsername(username);
        if (!sender || !sender.data) {
            throw new Error("Username tidak valid.");
        }

        const senderUsername = sender.data.username;
        const senderName = sender.data.name || senderUsername;

        // ==========================
        // 2. CEK USER TUJUAN
        // ==========================
        const receiver = await this.checkUser(phone);
        if (!receiver || !receiver.data) {
            throw new Error("User tujuan tidak ditemukan.");
        }

        const receiverUsername = receiver.data.username;

        // ==========================
        // 3. VALIDASI TRANSFER SENDIRI
        // ==========================
        if (senderUsername === receiverUsername) {
            throw new Error("Anda tidak dapat melakukan transfer ke akun sendiri.");
        }

        // ==========================
        // 4. CEK & VALIDASI SALDO
        // ==========================
        const saldo = await this.checkBalance(username);
        if (!saldo || !saldo.data) {
            throw new Error("Saldo tidak dapat diperiksa.");
        }

        // Memastikan menggunakan balance yang sesuai (prioritas balance_active)
        const currentBalance = Number(
            saldo.data.balance_active ?? saldo.data.balance ?? 0
        );

        if (currentBalance < totalPembayaran) {
            throw new Error("Saldo aktif tidak mencukupi.");
        }

        // ==========================
        // 5. EKSEKUSI TRANSFER (JAGEL API)
        // ==========================

        // A. Tambah Saldo Penerima
        const receiverNote = note && note.trim() !== ""
            ? `Transfer dari ${senderName}: ${note}`
            : `Transfer dari ${senderName}`;

        await jagel.adjustBalance({
            type: 'phone',
            value: phone,
            apikey: config.apiTujuan,
            amount: nominal,
            note: receiverNote
        });

        // B. Kirim Notifikasi ke Penerima
        await jagel.sendMessage({
            type: 'phone',
            value: phone,
            apikey: config.apiTujuan,
            content: `Saldo diterima dari ${senderName} sebesar Rp ${Intl.NumberFormat('id-ID').format(nominal)}`
        });

        // C. Potong Saldo Pengirim (Termasuk Admin)
        const senderNote = note && note.trim() !== ""
            ? `Transfer ke ${phone}: ${note}`
            : `Transfer ke ${phone}`;

        await jagel.adjustBalance({
            type: 'username',
            value: senderUsername,
            apikey: config.apiAsal,
            amount: -totalPembayaran,
            note: senderNote
        });

        // ==========================
        // 6. RETURN SUCCESS
        // ==========================
        return {
            sender: {
                username: senderUsername,
                name: senderName,
                phone: sender.data.phone
            },
            receiver: {
                username: receiverUsername,
                name: receiver.data.name,
                phone: receiver.data.phone
            },
            transfer: {
                amount: nominal,
                admin: adminFee,
                total: totalPembayaran,
                note: note || ""
            },
            balance: {
                previous: currentBalance,
                remaining: currentBalance - totalPembayaran
            }
        };
    }
}

module.exports = new TransferService();