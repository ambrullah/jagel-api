const pickMenuStyle = require("./pickMenuStyle");
const pickMenuScript = require("./pickMenuScript");

function pickMenuTemplate(config) {

    let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

${pickMenuStyle}

</style>

</head>

<body>

<div class="jgc_pick_section">

    <div class="jgc_pick_title">

        ${config.title}

    </div>

    <div class="jgc_pick_buttons">

        <button
            class="jgc_pick_btn"
            onclick="jgcToggle('jgc_voucher',this)">

            🎟️ Voucher

        </button>

        <button
            class="jgc_pick_btn"
            onclick="jgcToggle('jgc_near',this)">

            📍 Terdekat

        </button>

        <button
            class="jgc_pick_btn"
            onclick="jgcToggle('jgc_new',this)">

            ✨ Terbaru

        </button>

    </div>


    <div
        id="jgc_voucher"
        class="jgc_pick_content">

        <div class="jgc_voucher_wrap">

            <div class="jgc_voucher_scroll">
`;

    config.vouchers.forEach((voucher, index) => {

        html += `
<div class="jgc_voucher_card">

    <div class="jgc_voucher_name">

        ${voucher.name}

    </div>

    <div class="jgc_voucher_desc">

        ${voucher.desc}

    </div>

    <div class="jgc_voucher_code">

        <span id="voucher_${index}">

            ${voucher.code}

        </span>

        <button
            onclick="jgcCopyVoucher('voucher_${index}')">

            Salin

        </button>

    </div>

</div>
`;

    });

    html += `

            </div>

        </div>

    </div>


    <div
        id="jgc_near"
        class="jgc_pick_content">

        {lokasi_terdekat}

    </div>


    <div
        id="jgc_new"
        class="jgc_pick_content">

        {produk_baru}

    </div>

</div>

<div
id="jgc_toast"
style="
position:fixed;
bottom:20px;
left:50%;
transform:translateX(-50%);
background:#111;
color:#fff;
padding:10px 16px;
border-radius:10px;
font-size:13px;
display:none;
z-index:9999;">

</div>

<script>

${pickMenuScript}

</script>

<script>

function updateHeight(){

    const height =
        document.body.scrollHeight;

    window.parent.postMessage(
    {
        type:"pickMenuHeight",
        height:height
    },
    "*");

}

updateHeight();

window.addEventListener(
    "resize",
    updateHeight
);

</script>

</body>

</html>
`;

    return html;

}

module.exports = pickMenuTemplate;