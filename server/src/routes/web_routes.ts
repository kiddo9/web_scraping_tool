const express2 = require("express");
const routers = express2.Router();
const scraperController = require("../controllers/scraperController");

routers.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "Welcome to the Web Scraper API",
    version: "v3",
  });
});

routers.post("/scraper", scraperController.universalScraper);

module.exports = routers;
