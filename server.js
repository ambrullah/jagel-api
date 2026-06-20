const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");

const categoryRoutes = require("./routes/categoryRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

const app = express();

app.use(cors());

categoryRoutes(app);
bannerRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("🔥 Server jalan di port " + PORT);

});