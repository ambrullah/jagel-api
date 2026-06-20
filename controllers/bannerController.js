const bannerTemplate = require("../views/banners/bannerTemplate");

function bannerController(app) {

    app.get("/banner", (req, res) => {

        res.send(
            bannerTemplate()
        );

    });

}

module.exports = bannerController;