const fs = require("fs");
const path = require("path");

function addBalanceHistory(
    jenis,
    nominal,
    status,
    keterangan
) {

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

    const now = new Date();

    const transaksiBaru = {

        id: data.length + 1,

        tanggal: now.toLocaleDateString(
            "id-ID"
        ),

        jam: now.toLocaleTimeString(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        ),

        jenis,

        nominal,

        status,

        keterangan

    };

    data.unshift(
        transaksiBaru
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(
            data,
            null,
            2
        )
    );

}

module.exports =
    addBalanceHistory;