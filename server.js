const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());


// FLASH SALE API
app.get("/api/flashsale", async (req, res) => {

    try {


        const url =
        "https://app.jagel.id/api/v2/customer/component/350814165266a2fa4f3a6b698.01507135";


        const response = await axios.get(url, {

            params: {
                codename: "gocestransportasi",
                page: 1
            },


            headers: {

                "Accept": "application/json",

                "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",

                "Referer":
                "https://jgjk.mobi/",

                "Origin":
                "https://jgjk.mobi"

            }

        });



        const items =
        response.data.data.lists.data;



        res.json({

            success: true,

            total: items.length,


            data: items.map(item => ({


                id: item.view_uid,


                nama: item.title,


                harga: item.price,


                currency: item.currency,


                gambar:
                "https://www.jagel.id/api/listimage/" + item.image,


                // LINK PRODUK ASLI JAGEL
                link:
                "https://jgjk.mobi/p/" + item.view_uid


            }))

        });



    } catch (e) {


        console.log("ERROR JAGEL:");
        console.log(e.response?.data || e.message);



        res.json({

            success:false,

            error:e.message

        });


    }


});



// TEST SERVER
app.get("/", (req,res)=>{

    res.send("SERVER OK");

});



const PORT = process.env.PORT || 3000;

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
        <html>
        <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>

        body{
            margin:0;
            padding:10px;
            font-family:Arial,sans-serif;
            background:#f5f5f5;
        }

        .item{
            background:#fff;
            border-radius:12px;
            overflow:hidden;
            margin-bottom:12px;
            box-shadow:0 2px 8px rgba(0,0,0,.08);
        }

        .item img{
            width:100%;
            height:140px;
            object-fit:cover;
        }

        .title{
            padding:10px;
            font-weight:700;
        }

        .price{
            padding:0 10px 10px;
            color:#ff4d00;
            font-weight:700;
        }

        </style>
        </head>
        <body>
        `;

        items.forEach(item => {

            html += `
            <a href="https://jgjk.mobi/p/${item.view_uid}"
               style="text-decoration:none;color:black">

                <div class="item">

                    <img src="https://www.jagel.id/api/listimage/${item.image}">

                    <div class="title">
                        ${item.title}
                    </div>

                    <div class="price">
                        Rp ${item.price.toLocaleString()}
                    </div>

                </div>

            </a>
            `;

        });

        html += `
        </body>
        </html>
        `;

        res.send(html);

    } catch (err) {

        res.send("Error: " + err.message);

    }

});

app.listen(PORT,()=>{

console.log("🔥 Server jalan di port " + PORT);

});