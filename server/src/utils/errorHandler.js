"use strict";
const handleError = (req, res, error) => {
    const { code, message } = error;
    switch (code) {
        case "ECONNABORTED":
            return res.status(408).json({
                status: "error",
                message: "Request timed out",
            });
        case "ERR_BAD_REQUEST":
            return res.status(403).json({
                status: "error",
                message: "Request failed with status code 403 (unauthorized)",
            });
        case "ENOTFOUND":
            return res.status(404).json({
                status: "error",
                message: "URL not found or bad network connection",
            });
        case "ERR_INVALID_URL":
            return res.status(404).json({
                status: "error",
                message: " invalid Url",
            });
        case "ECONNRESET":
            return res.status(500).json({
                status: "error",
                message: " connection establishment failed",
            });
        default:
            return res.status(500).json({
                status: "error",
                message: "Scraping failed",
                error: message || "Unknown error",
            });
    }
};
module.exports = handleError;
