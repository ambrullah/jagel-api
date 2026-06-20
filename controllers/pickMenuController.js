const pickMenuTemplate =
    require("../views/pickMenu/pickMenuTemplate");

const pickMenuConfig =
    require("../config/pickMenuConfig");


function pickMenuController(app) {

    app.get(
        "/pick-menu",
        (req, res) => {

            res.send(
                pickMenuTemplate(
                    pickMenuConfig
                )
            );

        }
    );

}


module.exports =
    pickMenuController;