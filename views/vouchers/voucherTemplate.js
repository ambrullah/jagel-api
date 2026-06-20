const voucherStyle = require("./voucherStyle");
const voucherScript = require("./voucherScript");

function voucherTemplate(config) {

    let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

${voucherStyle}

</style>

</head>

<body>

<div class="voucher-section">

    <div class="voucher-title">

        ${config.title}

    </div>

    <div class="voucher-scroll">
`;

    const now = new Date();

    let activeCount = 0;

    config.items.forEach((voucher, index) => {

        const start =
            new Date(
                voucher.start.replace(
                    " ",
                    "T"
                )
            );

        const end =
            new Date(
                voucher.end.replace(
                    " ",
                    "T"
                )
            );

        if (
            now >= start &&
            now <= end
        ) {

            activeCount++;

            html += `
<div class="voucher-card voucher-${voucher.color}">

    <div class="voucher-top">

        <div class="voucher-badge ${voucher.badge.toLowerCase()}">

            ${voucher.badge === "HOT"
                    ? "🔥 HOT"
                    : voucher.badge === "BARU"
                        ? "🆕 BARU"
                        : "🎟 VOUCHER"
                }

        </div>

        <div class="voucher-name">

            ${voucher.icon} ${voucher.title}

        </div>

        <div class="voucher-desc">

            ${voucher.desc}

        </div>

    </div>

    <div class="voucher-divider">

    </div>

    <div class="voucher-bottom">

        <div class="voucher-code-box">

            <div
                class="voucher-code"
                id="voucher_${index}">

                ${voucher.code}

            </div>

            <button
                class="voucher-copy"
                onclick="
                copyVoucher(
                    'voucher_${index}'
                )
                ">

                Salin

            </button>

        </div>

        <div class="voucher-expire">

            ⏰ Berlaku sampai
            ${voucher.end}

        </div>

    </div>

</div>
`;

        }

    });

    html += `

    </div>

</div>

<div
    id="voucher_toast">

</div>

<script>

${voucherScript}

</script>

</body>

</html>
`;

    return html;

}

module.exports = voucherTemplate;