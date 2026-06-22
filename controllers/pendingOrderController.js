const axios = require("axios");

const pendingOrderTemplate =
    require("../views/pendingOrder/pendingOrderTemplate");


async function pendingOrderController(req, res) {

    try {

        const response = await axios.get(
            "https://api.jagel.id/v1/pendingOrder",
            {
                params: {
                    apikey: process.env.JAGEL_API_KEY
                },

                headers: {
                    Accept: "application/json"
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

        if (
            error.response &&
            error.response.data &&
            error.response.data.message ===
            "Order tidak ditemukan"
        ) {

            return res.send(
                pendingOrderTemplate([])
            );

        }

        console.log(error.response?.data);

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