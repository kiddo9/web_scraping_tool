"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express2 = require("express"); // Import express
const routers = express2.Router(); // Create a new router instance
const scraperController = require("../controllers/scraperController"); // Import the scraper controller
// Define the base route for the web scraper API
// This route will respond with a welcome message and API version
routers.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Web Scraper API",
        version: "v3",
    });
});
routers.get(`/proxy-pdf-file-for-ipad`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query;
    try {
        if (!url) {
            throw new Error("invalid or missing query");
        }
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch file infomation");
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/pdf");
        const fileBuffer = yield response.arrayBuffer();
        res.send(Buffer.from(fileBuffer));
    }
    catch (error) {
        res.status(500).send("Error fetching pdf");
    }
}));
// Define the route for the universal scraper
routers.post("/scraper", scraperController.universalScraper);
routers.post("/save", scraperController.saveScrapedData);
module.exports = routers;
