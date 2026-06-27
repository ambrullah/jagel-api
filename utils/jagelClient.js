const axios = require("axios");
const config = require("../config/jagel");

const client = axios.create({
    baseURL: "https://api.jagel.id/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// ===================================
// CEK USER BERDASARKAN NOMOR HP
// ===================================
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

// ===================================
// CEK USER BERDASARKAN USERNAME (BARU)
// ===================================
async function getUserByUsername(username) {

    const response = await client.get("/user", {
        params: {
            type: "username",
            value: username,
            apikey: config.apiAsal
        }
    });

    return response.data;

}

// ===================================
// CEK USER BERDASARKAN SESSION
// ===================================
async function getSession(session) {

    const response = await client.get("/user", {
        params: {
            type: "session",
            value: session,
            apikey: config.apiAsal
        }
    });

    return response.data;

}

// ===================================
// CEK SALDO BERDASARKAN SESSION
// ===================================
async function checkBalance(session) {

    const response = await client.get("/balance/check", {
        params: {
            type: "session",
            value: session,
            apikey: config.apiAsal
        }
    });

    return response.data;

}

// ===================================
// CEK SALDO BERDASARKAN USERNAME
// ===================================
async function checkBalanceByUsername(username) {

    const response = await client.get("/balance/check", {
        params: {
            type: "username",
            value: username,
            apikey: config.apiAsal
        }
    });

    return response.data;

}

// ===================================
// TAMBAH / KURANG SALDO
// ===================================
async function adjustBalance(payload) {

    const response = await client.post(
        "/balance/adjust",
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    );

    return response.data;

}

// ===================================
// KIRIM PESAN
// ===================================
async function sendMessage(payload) {

    const response = await client.post(
        "/message/send",
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    );

    return response.data;

}

module.exports = {

    getUser,

    getUserByUsername,

    getSession,

    checkBalance,

    checkBalanceByUsername,

    adjustBalance,

    sendMessage

};