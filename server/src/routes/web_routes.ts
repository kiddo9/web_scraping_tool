const express2 = require("express"); // Import express
const routers = express2.Router(); // Create a new router instance
const scraperController = require("../controllers/scraperController"); // Import the scraper controller

// Define the base route for the web scraper API
// This route will respond with a welcome message and API version
routers.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "Welcome to the Web Scraper API",
    version: "v3",
  });
});

// Define the route for the universal scraper
routers.post("/scraper", scraperController.universalScraper);
routers.post("/save", scraperController.saveScrapedData);

module.exports = routers;
