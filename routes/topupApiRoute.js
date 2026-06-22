const topupApiController =
    require("../controllers/topupApiController");

module.exports = function (app) {

    app.post(
        "/api/topup",
        topupApiController
    );

};