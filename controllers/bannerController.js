const bannerTemplate = require("../views/banners/bannerTemplate");

const bannerConfig =
    require("../config/bannerConfig");

const bannerOngkirConfig =
    require("../config/bannerOngkirConfig");

function bannerController(app) {

    app.get("/banner", (req, res) => {

        res.send(
            bannerTemplate(
                bannerConfig
            )
        );

    });

    app.get("/banner-ongkir", (req, res) => {

        res.send(
            bannerTemplate(
                bannerOngkirConfig
            )
        );

    });

}

module.exports = bannerController;