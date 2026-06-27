const transferService = require("../services/transferService");
const response = require("../utils/response");

// =====================================
// CEK USER BERDASARKAN NOMOR HP
// =====================================
exports.checkUser = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return response.error(res, "Nomor HP wajib diisi.", 400);
        }

        const result = await transferService.checkUser(phone);

        if (!result || !result.data) {
            return response.error(res, "Pengguna tidak ditemukan.", 404);
        }

        return response.success(res, {
            username: result.data.username,
            name: result.data.name,
            phone: result.data.phone
        }, "User ditemukan.");

    } catch (err) {
        console.error("CHECK USER ERROR :", err.message);
        return response.error(res, "Terjadi kesalahan saat mencari pengguna.", 500);
    }
};

// =====================================
// CEK SALDO
// =====================================
exports.checkBalance = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return response.error(res, "Username wajib diisi.", 400);
        }

        const result = await transferService.checkBalance(username);

        if (!result || !result.data) {
            return response.error(res, "Gagal mengambil data saldo.", 500);
        }

        const balance = Number(result.data.balance_active ?? result.data.balance ?? 0);

        return response.success(res, { balance }, "Saldo berhasil diambil.");

    } catch (err) {
        console.error("CHECK BALANCE ERROR :", err.message);
        return response.error(res, "Terjadi kesalahan saat mengecek saldo.", 500);
    }
};

// =====================================
// TRANSFER SALDO
// =====================================
exports.transfer = async (req, res) => {
    try {

        const {
            username,
            phone,
            amount,
            note
        } = req.body;

        if (!username || !phone || !amount) {
            return response.error(res, "Data tidak lengkap.", 400);
        }

        if (Number(amount) < 10000) {
            return response.error(res, "Minimal transfer adalah Rp10.000.", 400);
        }

        const result = await transferService.transfer({
            username,
            phone,
            amount: Number(amount),
            note: note || ""
        });

        return response.success(res, result, "Transfer berhasil dilakukan.");

    } catch (err) {
        console.error("TRANSFER ERROR :", err.message);
        return response.error(res, err.message || "Gagal melakukan transfer.", 500);
    }
};