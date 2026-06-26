const transferService = require("../services/transferService");
const response = require("../utils/response");

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

        const result =
            await transferService.checkUser(phone);

        if (!result.data) {

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

        console.error(err.response?.data || err.message);

        return response.error(
            res,
            "Terjadi kesalahan server."
        );

    }

};