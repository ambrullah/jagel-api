const pendingOrderController =
    require("../controllers/pendingOrderController");

module.exports = function (app) {

    app.get(
        "/pending-order",
        pendingOrderController
    );

};