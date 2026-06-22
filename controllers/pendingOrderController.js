const axios = require("axios");

async function pendingOrderController(req, res) {

    try {

        const response = await axios.get(
            "https://api.jagel.id/v1/pendingOrder",
            {
                params: {
                    apikey: process.env.JAGEL_API_KEY
                }
            }
        );

        res.send(response.data);

    }
    catch (error) {

        res.send(error.message);

    }

}

module.exports = pendingOrderController;