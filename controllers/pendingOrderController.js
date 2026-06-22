const axios = require("axios");
const pendingOrderTemplate =
    require("../views/pendingOrder/pendingOrderTemplate");

async function pendingOrderController(req, res) {

    try {

        const response =
            await axios.post(
                "https://api.jagel.id/v1/pendingOrder",
                {
                    apikey:
                        process.env.JAGEL_API_KEY
                },
                {
                    headers: {
                        Accept:
                            "application/json"
                    }
                }
            );

        const orders =
            response.data.data || [];

        res.send(
            pendingOrderTemplate(
                orders
            )
        );

    }
    catch (error) {

        console.log(
            error.response?.data
        );

        res.send(`
<h3>
Gagal mengambil data pending order
</h3>

<pre>
${error.message}

---------------------

${JSON.stringify(
            error.response?.data,
            null,
            4
        )}

</pre>
`);

    }

}

module.exports =
    pendingOrderController;