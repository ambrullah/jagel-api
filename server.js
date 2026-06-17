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


app.listen(PORT,()=>{

console.log("🔥 Server jalan di port " + PORT);

});