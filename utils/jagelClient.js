const axios = require("axios");
const config = require("../config/jagel");

const client = axios.create({
    baseURL: "https://api.jagel.id/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

// ===============================
// CARI USER
// ===============================
async function getUser(phone) {

    const response = await client.get("/user", {
        params: {
            type: "phone",
            value: phone,
            apikey: config.apiTujuan
        }
    });

    return response.data;

}

// ===============================
// CEK SALDO
// ===============================
async function checkBalance(username) {

    const response = await client.get("/balance/check", {
        params: {
            type: "username",
            value: username,
            apikey: config.apiAsal
        }
    });

    return response.data;

}

// ===============================
// TAMBAH / KURANG SALDO
// ===============================
async function adjustBalance(payload) {

    const response = await client.post(
        "/balance/adjust",
        payload
    );

    return response.data;

}

// ===============================
// KIRIM NOTIFIKASI
// ===============================
async function sendMessage(payload) {

    const response = await client.post(
        "/message/send",
        payload
    );

    return response.data;

}

module.exports = {

    getUser,

    checkBalance,

    adjustBalance,

    sendMessage

};