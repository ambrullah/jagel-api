module.exports = {

    apiAsal: process.env.JAGEL_API_ASAL,

    apiTujuan: process.env.JAGEL_API_TUJUAN,

    appName: process.env.APP_NAME,

    adminFee: Number(process.env.ADMIN_FEE || 500),

    secretKey: process.env.SECRET_KEY

};