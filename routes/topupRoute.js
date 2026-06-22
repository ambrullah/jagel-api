const topupController =
    require(
        "../controllers/topupController"
    );

module.exports =
    function (
        app
    ) {

        app.get(
            "/topup",
            topupController
        );

        app.post(
            "/topup",
            topupController
        );

    };