const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");

const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const promoStripController =
    require("./controllers/promoStripController");
const pickMenuController =
    require("./controllers/pickMenuController");

const app = express();

app.use(cors());

categoryRoutes(app);
bannerRoutes(app);
promoStripController(app);
pickMenuController(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("🔥 Server jalan di port " + PORT);

});