const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/flashsale", async (req, res) => {

    try {

        const response = await axios.get(
            "https://app.jagel.id/api/v2/customer/component/350814165266a2fa4f3a6b698.01507135",
            {
                params: {
                    codename: "gocestransportasi",
                    page: 1
                }
            }
        );

        const items = response.data.data.lists.data;

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
            padding:5px;
            overflow-x:auto;
            overflow-y:hidden;
            font-family:Arial,sans-serif;
        }

        .wrap{
            display:flex;
            gap:10px;
        }

        .item{
            width:130px;
            flex-shrink:0;
            background:#fff;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 3px 10px rgba(0,0,0,.08);
        }

        .item img{
            width:130px;
            height:100px;
            object-fit:cover;
            display:block;
        }

        .title{
            padding:8px 8px 4px;
            font-size:13px;
            font-weight:600;
            color:#111;
            min-height:40px;
        }

        .price{
            padding:0 8px 10px;
            color:#008cff;
            font-size:12px;
            font-weight:700;
        }

        a{
            text-decoration:none;
            color:inherit;
        }

        </style>
        </head>

        <body>

        <div class="wrap">
        `;

        items.forEach(item => {

            html += `
            <a href="action://p/${item.view_uid}">

                <div class="item">

                    <img src="https://www.jagel.id/api/listimage/${item.image}">

                    <div class="title">
                        ${item.title}
                    </div>

                    <div class="price">
                        ${item.currency} ${item.price.toLocaleString()}
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

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("🔥 Server jalan di port " + PORT);

});