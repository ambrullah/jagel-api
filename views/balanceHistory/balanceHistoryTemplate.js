function balanceHistoryTemplate(data) {

    let html = "";

    data.forEach(item => {

        const warna =
            item.status === "Masuk"
                ? "#00aa13"
                : "#ff4d4f";

        const tanda =
            item.status === "Masuk"
                ? "+"
                : "-";

        html += `
        <div class="item">

            <div class="left">

                <div class="jenis">
                    ${item.jenis}
                </div>

                <div class="tanggal">
                    ${item.tanggal}
                </div>

            </div>

            <div class="right">

                <div
                    class="nominal"
                    style="color:${warna};">

                    ${tanda}Rp${item.nominal.toLocaleString("id-ID")}

                </div>

                <div class="status">

                    ${item.status}

                </div>

            </div>

        </div>
        `;

    });

    return `
<!DOCTYPE html>
<html>

<head>

<style>

body{
    background:#f5f5f5;
    font-family:Arial;
    padding:15px;
}

.title{
    font-size:24px;
    font-weight:700;
    margin-bottom:20px;
}

.item{
    background:#fff;
    padding:18px;
    border-radius:20px;
    margin-bottom:15px;

    display:flex;
    justify-content:space-between;
    align-items:center;

    box-shadow:0 2px 10px rgba(0,0,0,.05);
}

.jenis{
    font-size:16px;
    font-weight:700;
}

.tanggal{
    margin-top:5px;
    color:#888;
    font-size:13px;
}

.nominal{
    font-size:17px;
    font-weight:700;
}

.status{
    margin-top:5px;
    color:#888;
    font-size:13px;
    text-align:right;
}

</style>

</head>

<body>

<div class="title">

    Riwayat Saldo

</div>

${html}

</body>

</html>
`;

}

module.exports =
    balanceHistoryTemplate;