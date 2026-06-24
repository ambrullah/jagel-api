require("dotenv").config();
console.log(process.env.JAGEL_API_KEY);

const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");

const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const promoStripController =
    require("./controllers/promoStripController");
const voucherController =
    require(
        "./controllers/voucherController"
    );

const app = express();

app.use(cors());

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    "/goces-merchant",
    express.static("goces-merchant")
);

categoryRoutes(app);
bannerRoutes(app);
promoStripController(app);
voucherController(app);

require("./routes/pendingOrderRoute")(app);
require(
    "./routes/balanceHistoryRoute"
)(app);

require(
    "./routes/topupApiRoute"
)(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("🔥 Server jalan di port " + PORT);

});