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

routers.get(`/proxy-pdf-file-for-ipad`, async (req: any, res: any) => {
  const { url } = req.query;
  try {
    if (!url) {
      throw new Error("invalid or missing query");
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch file infomation");
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/pdf");

    const fileBuffer = await response.arrayBuffer();
    res.send(Buffer.from(fileBuffer));
  } catch (error) {
    res.status(500).send("Error fetching pdf");
  }
});

// Define the route for the universal scraper
routers.post("/scraper", scraperController.universalScraper);
routers.post("/save", scraperController.saveScrapedData);

module.exports = routers;
