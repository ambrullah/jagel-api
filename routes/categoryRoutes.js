const createCategoryPage = require("../controllers/categoryController");

const categoryConfig = require("../config/categoryConfig");

module.exports = function (app) {

    categoryConfig.forEach(category => {

        createCategoryPage(
            app,
            category.path,
            category.componentId,
            category.title
        );

    });

};