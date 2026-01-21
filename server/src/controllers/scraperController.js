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
const universalScraperFunction = require("../utils/functions"); //import the scraping function
const ErrorHandler = require("../utils/errorHandler"); //import the error handling utility function
const fs = require("fs"); //import the file system module
const path = require("path"); //import the path module
//create a scraper controller function
exports.universalScraper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query; //get the url from the request query
    const parsedUrl = Array.isArray(url)
        ? res.json({ status: "error", message: "URL is required" })
        : JSON.parse(url); // check if the url is an array or a string, if it is an array return an error message, if it is a string parse it
    //check if the url is empty
    if (parsedUrl.length === 0) {
        return res
            .status(400)
            .json({ status: "error", message: "URL is required" });
    }
    // using the try catch block
    try {
        const results = yield Promise.all(parsedUrl.map((u) => {
            const scrapedData = universalScraperFunction(u);
            return scrapedData;
        })); // scrape all the urls in parallel
        results.map((result, index) => {
            console.log("All information: " +
                results +
                "Company information: " +
                result.companyInfo +
                " " +
                index);
        });
        //send response to there client
        return res.json({
            status: "success",
            message: "Scraping complete",
            res: results,
        });
    }
    catch (error) {
        console.error("Scraping Error:", error.message, error.code); // log the error message and code
        return ErrorHandler(req, res, error); // handle errors using the error handler utility
    }
});
// save scraped data to a file controller
exports.saveScrapedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body; // get the data from the request body
    console.log("Data to save:", data); // log the data to be saved
    if (Array.isArray(data) && data.length === 0) {
        return res.status(400).json({
            status: "error",
            message: "No data to save",
        });
    }
    const filePath = path.join(__dirname, "../../storage.json");
    let fileData = [];
    data.forEach((info) => {
        if (!info.companyInfo) {
            return res.status(400).json({
                status: "error",
                message: "Invalid data format",
            });
        }
        if (fs.existsSync(filePath)) {
            try {
                const fileExists = fs.readFileSync(filePath, "utf8");
                const exist = JSON.parse(fileExists);
                fileData = exist;
            }
            catch (error) {
                console.log("sth dey", error);
            }
        }
        fileData.push(info.companyInfo);
        try {
            fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("ok");
                }
            });
            console.log("✅ Data successfully written to storage.json");
            return res.status(200).json({
                status: "success",
                message: "Data successfully saved",
            });
        }
        catch (err) {
            console.error("❌ Failed to write to storage.json:", err.message);
        }
    });
});
