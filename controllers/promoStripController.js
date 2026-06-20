const promoStripTemplate =
    require("../views/promoStrip/promoStripTemplate");

const promoStripConfig =
    require("../config/promoStripConfig");


function promoStripController(app) {

    app.get(
        "/promo-strip",
        (req, res) => {

            res.send(
                promoStripTemplate(
                    promoStripConfig
                )
            );

        }
    );

}

module.exports =
    promoStripController;