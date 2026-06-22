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

        console.log({

            amount,

            session,

            apikey:
                process.env.JAGEL_API_KEY

        });

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

        const data =
            response.data.data;

        res.json({

            success: true,

            order_no:
                data.order_no,

            total:
                data.total,

            confirmation_code:
                data.confirmation_code

        });

    }

    catch (error) {

        console.log(

            "TOPUP ERROR:",

            error.response?.data ||

            error.message

        );

        res.json({

            success: false,

            error:

                error.response?.data ||

                error.message

        });

    }

}

module.exports =
    topupApiController;