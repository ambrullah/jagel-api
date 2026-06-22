const axios = require("axios");

const topupTemplate =
    require(
        "../views/topup/topupTemplate"
    );

async function topupController(
    req,
    res
) {

    try {

        // Tampilkan halaman top up
        if (
            !req.body ||
            !req.body.amount
        ) {

            return res.send(
                topupTemplate()
            );

        }

        // Bersihkan nominal
        const amount =
            req.body.amount
                .replace(
                    /[^0-9]/g,
                    ""
                );

        console.log(
            "Nominal:",
            amount
        );

        // Request ke API Jagel
        const response =
            await axios.post(

                "https://api.jagel.id/v1/order/topup",

                {

                    apikey:
                        process.env.JAGEL_API_KEY,

                    amount:
                        amount,

                    type:
                        "session",

                    value:
                        "{session}"

                },

                {

                    headers: {

                        Accept:
                            "application/json"

                    }

                }

            );

        const data =
            response.data.data;

        res.send(`

<h1>
Top Up Berhasil
</h1>

<p>
Nomor Order:
<b>
${data.order_no}
</b>
</p>

<p>
Total Pembayaran:
<b>
Rp ${Number(
            data.total
        ).toLocaleString(
            "id-ID"
        )}
</b>
</p>

<p>
Kode Unik:
<b>
${data.confirmation_code}
</b>
</p>

`);

    }

    catch (
    error
    ) {

        console.log(
            error.response?.data
        );

        res.send(`

<h2>
Gagal Top Up
</h2>

<pre>

${error.message}

------------------

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
    topupController;