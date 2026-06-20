const categoryStyle = require("./styles/categoryStyle");

function categoryTemplate(items, title = "") {

    let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

${categoryStyle}

</style>

</head>

<body>

${title ? `
<div class="section_title">
    ${title}
</div>
` : ""}

<div class="wrap">
`;

    items.forEach(item => {

        html += `
<a href="action://p/${item.view_uid}">

    <div class="item">

        <img src="https://www.jagel.id/api/listimage/${item.image}">

        <div class="item_name">
            ${item.title}
        </div>

        <div class="item_price">
            Rp ${Number(item.price || 0).toLocaleString("id-ID")}
        </div>

    </div>

</a>
`;

    });

    html += `
</div>

</body>

</html>
`;

    return html;

}

module.exports = categoryTemplate;