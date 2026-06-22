const axios = require("axios");

async function topupApiController(
    req,
    res
) {

    try {

        const amount =
            req.body.amount;

        const session =
            req.body.session;

        const response =
            await axios.post(

                "https://api.jagel.id/v1/order/topup",

                {

                    apikey:
                        process.env.JAGEL_API_KEY,

                    amount,

                    type:
                        "session",

                    value:
                        session

                },

                {

                    headers: {

                        Accept:
                            "application/json"

                    }

                }

            );

        res.json({

            success: true,

            data:
                response.data.data

        });

    }

    catch (error) {

        console.log(
            error.response?.data
        );

        res.json({

            success: false,

            message:
                error.response?.data ||
                error.message

        });

    }

}

module.exports =
    topupApiController;