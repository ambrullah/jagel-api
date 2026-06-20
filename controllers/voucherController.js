const voucherTemplate =
    require(
        "../views/vouchers/voucherTemplate"
    );

const voucherConfig =
    require(
        "../config/voucherConfig"
    );


function voucherController(app) {

    app.get(
        "/voucher",
        (req, res) => {

            res.send(
                voucherTemplate(
                    voucherConfig
                )
            );

        }
    );

}


module.exports =
    voucherController;