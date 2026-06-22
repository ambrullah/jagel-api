const axios = require("axios");

const pendingOrderTemplate =
    require("../views/pendingOrder/pendingOrderTemplate");


async function pendingOrderController(req, res) {

    try {

        console.log(
            "JAGEL_API_KEY :",
            process.env.JAGEL_API_KEY
        );

        const response = await axios({
            method: "get",

            url:
                "https://api.jagel.id/v1/pendingOrder",

            params: {
                apikey:
                    process.env.JAGEL_API_KEY
            },

            headers: {
                Accept:
                    "application/json"
            }
        });

        console.log(
            "Response Jagel :",
            response.data
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

        console.log(
            "Status :",
            error.response?.status
        );

        console.log(
            "Response Error :",
            error.response?.data
        );

        res.send(`
<h3>
Gagal mengambil data pending order
</h3>

<pre>

Status :

${error.response?.status}

--------------------------------

Pesan :

${error.message}

--------------------------------

Response :

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