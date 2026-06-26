const transferService = require("../services/transferService");
const response = require("../utils/response");

// ===============================
// CEK USER
// ===============================
exports.checkUser = async (req, res) => {

    try {

        const { phone } = req.body;

        if (!phone) {

            return response.error(
                res,
                "Nomor HP wajib diisi.",
                400
            );

        }

        const result = await transferService.checkUser(phone);

        if (!result || !result.data) {

            return response.error(
                res,
                "Nomor tidak ditemukan.",
                404
            );

        }

        return response.success(
            res,
            {
                username: result.data.username,
                phone: phone
            },
            "User ditemukan"
        );

    } catch (err) {

        console.error(
            "CHECK USER ERROR :",
            err.response?.data || err.message
        );

        return response.error(
            res,
            "Terjadi kesalahan server."
        );

    }

};

// ===============================
// TRANSFER
// ===============================
exports.transfer = async (req, res) => {

    try {

        const {

            phone,
            username,
            amount,
            note

        } = req.body;

        if (!phone) {

            return response.error(
                res,
                "Nomor tujuan wajib diisi.",
                400
            );

        }

        if (!username) {

            return response.error(
                res,
                "Username pengirim wajib diisi.",
                400
            );

        }

        if (!amount || Number(amount) <= 0) {

            return response.error(
                res,
                "Nominal transfer tidak valid.",
                400
            );

        }

        const result =
            await transferService.transfer({

                phone,

                username,

                amount: Number(amount),

                note

            });

        return response.success(

            res,

            result,

            "Transfer berhasil diproses."

        );

    } catch (err) {

        console.error(
            "TRANSFER ERROR :",
            err.response?.data || err.message
        );

        return response.error(
            res,
            "Transfer gagal diproses."
        );

    }

};