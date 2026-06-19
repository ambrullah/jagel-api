const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();

app.use(cors());

function createCategoryPage(path, componentId, title = "") {

    app.get(path, async (req, res) => {

        try {

            const response = await axios.get(
                `https://app.jagel.id/api/v2/customer/component/${componentId}`,
                {
                    params: {
                        codename: "gocesapp",
                        page: 1,
                        app_mode: 1,
                        per_page: 8
                    }
                }
            );

            const items = response.data.data.lists.data || [];

            // Jika tidak ada produk, kirim halaman kosong
            if (items.length === 0) {

                return res.send(`
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

html,
body{
    margin:0;
    padding:0;
    background:transparent;
    overflow:hidden;
}

</style>

</head>

<body>
</body>

</html>
                `);

            }

            let html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:transparent;
    padding:8px;
    font-family:Arial,sans-serif;
}


/* TITLE */

.section_title{
    margin:0 8px 10px;
    color:#222;
    font-size:18px;
    font-weight:700;
}


/* SLIDER */

.wrap{
    display:flex;
    gap:12px;

    overflow-x:auto;
    overflow-y:hidden;

    scrollbar-width:none;
}

.wrap::-webkit-scrollbar{
    display:none;
}


/* CARD */

.item{
    width:140px;

    flex-shrink:0;

    background:#fff;

    border-radius:18px;

    overflow:hidden;

    display:flex;

    flex-direction:column;

    box-shadow:0 2px 10px rgba(0,0,0,.06);
}


/* IMAGE */

.item img{
    width:100%;

    aspect-ratio:1;

    object-fit:cover;

    display:block;
}


/* PRODUCT NAME */

.item_name{
    padding:10px 10px 6px;

    font-size:11px;

    line-height:1.4;

    font-weight:500;

    color:#333;

    min-height:40px;

    overflow:hidden;

    display:-webkit-box;

    -webkit-line-clamp:2;

    -webkit-box-orient:vertical;
}


/* PRICE */

.item_price{
    margin-top:auto;

    padding:0 10px 12px;

    color:#008cff;

    font-size:15px;

    font-weight:700;
}


/* LINK */

a{
    text-decoration:none;
    color:inherit;
}

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

            res.send(html);

        } catch (err) {

            res.send("Error : " + err.message);

        }

    });

}


createCategoryPage(
    "/flashsale",
    "464113167266a3241aa7cdf37.67370314"
);

createCategoryPage(
    "/fashion",
    "282513168266a338f586bef13.52829636",
    "Fashion Terbaru"
);

createCategoryPage(
    "/kecantikan",
    "562513168266a338f74385b73.47876782",
    "Produk Kecantikan"
);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("🔥 Server jalan di port " + PORT);

});