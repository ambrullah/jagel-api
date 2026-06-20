const promoStripStyle = require("./promoStripStyle");

function promoStripTemplate(config) {

    let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

${promoStripStyle}

</style>

</head>

<body>

<div class="promo-strip">

    <a href="${config.link}">

        <img
            src="${config.image}"
            alt="Promo">

    </a>

</div>

</body>

</html>
`;

    return html;

}

module.exports = promoStripTemplate;