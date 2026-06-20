const bannerTemplate = require("../views/banners/bannerTemplate");

const bannerConfig =
    require("../config/bannerConfig");

const bannerOngkirConfig =
    require("../config/bannerOngkirConfig");

const bannerMakananConfig =
    require("../config/bannerMakananConfig");

const bannerFashionConfig =
    require("../config/bannerFashionConfig");

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

    app.get("/banner-makanan", (req, res) => {

        res.send(
            bannerTemplate(
                bannerMakananConfig
            )
        );

    });

    app.get("/banner-fashion", (req, res) => {

        res.send(
            bannerTemplate(
                bannerFashionConfig
            )
        );

    });

}

module.exports = bannerController;