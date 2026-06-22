const fs = require("fs");
const path = require("path");

function balanceHistoryController(req, res) {

    const filePath = path.join(
        __dirname,
        "../database/saldoHistory.json"
    );

    const data = JSON.parse(
        fs.readFileSync(
            filePath,
            "utf8"
        )
    );

    const balanceHistoryTemplate =
        require(
            "../views/balanceHistory/balanceHistoryTemplate"
        );

    res.send(
        balanceHistoryTemplate(data)
    );

}

module.exports =
    balanceHistoryController;