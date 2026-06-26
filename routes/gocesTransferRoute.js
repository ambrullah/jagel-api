const express = require("express");

const router = express.Router();

const transferController =
    require("../controllers/gocesTransferController");

router.post(
    "/check-user",
    transferController.checkUser
);

router.post(

    "/transfer",

    transferController.transfer

);

module.exports = router;