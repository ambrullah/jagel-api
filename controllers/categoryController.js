const axios = require("axios");

const categoryTemplate = require("../views/categoryTemplate");
const emptyCategoryTemplate = require("../views/emptyCategoryTemplate");

function createCategoryPage(app, path, componentId, title = "") {

    app.get(path, async (req, res) => {

        try {

            const response = await axios.get(
                `https://app.jagel.id/api/v2/customer/component/${componentId}`,
                {
                    params: {
                        codename: "gocesapp",
                        page: 1,
                        app_mode: 1,
                        per_page: 8
                    }
                }
            );

            const items = response.data.data.lists.data || [];

            // Jika tidak ada produk
            if (items.length === 0) {

                return res.send(
                    emptyCategoryTemplate()
                );

            }

            res.send(
                categoryTemplate(items, title)
            );

        } catch (err) {

            res.send(
                "Error : " + err.message
            );

        }

    });

}

module.exports = createCategoryPage;