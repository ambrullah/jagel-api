const createCategoryPage = require("../controllers/categoryController");

module.exports = function (app) {

    createCategoryPage(
        app,
        "/flashsale",
        "464113167266a3241aa7cdf37.67370314"
    );

    createCategoryPage(
        app,
        "/fashion",
        "282513168266a338f586bef13.52829636",
        "Fashion Terbaru"
    );

    createCategoryPage(
        app,
        "/kecantikan",
        "562513168266a338f74385b73.47876782",
        "Produk Kecantikan"
    );

};