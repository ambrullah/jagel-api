const balanceHistoryController =
    require(
        "../controllers/balanceHistoryController"
    );

module.exports = function (app) {

    app.get(
        "/balance-history",
        balanceHistoryController
    );

};