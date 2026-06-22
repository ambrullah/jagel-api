function topupTemplate() {

    return `

<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:#f6f7f9;
    min-height:100vh;
    display:flex;
    align-items:flex-end;
}

.gtp_sheet{
    width:100%;
    background:#fff;
    border-radius:28px 28px 0 0;
    padding:18px 18px 30px;
    animation:gtpUp .3s ease;
    box-shadow:0 -5px 20px rgba(0,0,0,.08);
}

@keyframes gtpUp{

    from{
        transform:translateY(100%);
    }

    to{
        transform:translateY(0);
    }

}

.gtp_bar{
    width:55px;
    height:5px;
    background:#ddd;
    border-radius:20px;
    margin:auto;
}

.gtp_title{
    margin-top:22px;
    font-size:24px;
    font-weight:700;
    color:#111;
}

.gtp_desc{
    margin-top:8px;
    color:#777;
    font-size:14px;
    line-height:22px;
}

.gtp_label{
    margin-top:28px;
    margin-bottom:12px;
    font-size:14px;
    font-weight:700;
    color:#111;
}

.gtp_input{
    width:100%;
    height:58px;
    border:none;
    outline:none;
    background:#f5f6f8;
    border-radius:18px;
    padding:0 18px;
    font-size:22px;
    font-weight:700;
    color:#111;
}

.gtp_quick{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:12px;
    margin-top:20px;
}

.gtp_item{
    height:50px;
    border:none;
    background:#f5f6f8;
    border-radius:16px;
    font-size:14px;
    font-weight:700;
    color:#00aa13;
    cursor:pointer;
}

.gtp_item:active{
    transform:scale(.97);
}

.gtp_btn{
    width:100%;
    height:58px;
    margin-top:30px;
    border:none;
    border-radius:18px;
    background:#00aa13;
    color:#fff;
    font-size:16px;
    font-weight:700;
    cursor:pointer;
}

.gtp_btn:active{
    transform:scale(.98);
}

</style>

</head>

<body>

<div class="gtp_sheet">

    <div class="gtp_bar"></div>

    <div class="gtp_title">

        Top Up Saldo

    </div>

    <div class="gtp_desc">

        Isi saldo akun dengan cepat dan aman untuk melakukan berbagai transaksi.

    </div>

    <form>

        <div class="gtp_label">

            Nominal Top Up

        </div>

        <input
            id="amount"
            class="gtp_input"
            type="text"
            placeholder="Rp 0"
            oninput="formatRupiah(this)">

        <div class="gtp_quick">

            <button
                type="button"
                class="gtp_item"
                onclick="setAmount(10000)">

                10rb

            </button>

            <button
                type="button"
                class="gtp_item"
                onclick="setAmount(20000)">

                20rb

            </button>

            <button
                type="button"
                class="gtp_item"
                onclick="setAmount(50000)">

                50rb

            </button>

            <button
                type="button"
                class="gtp_item"
                onclick="setAmount(100000)">

                100rb

            </button>

            <button
                type="button"
                class="gtp_item"
                onclick="setAmount(200000)">

                200rb

            </button>

            <button
                type="button"
                class="gtp_item"
                onclick="setAmount(500000)">

                500rb

            </button>

        </div>

        <button
            class="gtp_btn">

            Lanjutkan Top Up

        </button>

    </form>

</div>

<script>

function setAmount(value){

    document
        .getElementById(
            "amount"
        )
        .value =
        "Rp " +
        value.toLocaleString(
            "id-ID"
        );

}

function formatRupiah(input){

    let angka =
        input.value
        .replace(
            /[^0-9]/g,
            ""
        );

    if(
        angka === ""
    ){

        input.value = "";

        return;

    }

    input.value =
        "Rp " +
        parseInt(
            angka
        ).toLocaleString(
            "id-ID"
        );

}

</script>

</body>
</html>

`;

}

module.exports =
    topupTemplate;