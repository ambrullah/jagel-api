const express = require("express");
const router = express.Router();
const transferController = require("../controllers/gocesTransferController");

// Endpoint Cek User
router.post("/check-user", transferController.checkUser);

// Endpoint Cek Saldo
router.post("/check-balance", transferController.checkBalance);

// Endpoint Transfer
router.post("/transfer", transferController.transfer);

module.exports = router;