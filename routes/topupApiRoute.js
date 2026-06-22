const topupApiController =
    require("../controllers/topupApiController");

module.exports = function (app) {

    app.get(
        "/api/topup",
        (req, res) => {

            res.json({
                success: true,
                message: "Topup API aktif"
            });

        }
    );

    app.post(
        "/api/topup",
        topupApiController
    );

};