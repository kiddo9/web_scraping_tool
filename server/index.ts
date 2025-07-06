require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // Import express
const cors = require("cors"); // Import CORS middleware
// Import body-parser to parse incoming request bodies
const bodyParser = require("body-parser");
const app = express(); // Create an instance of express
const routes = require("./src/routes/web_routes"); // Import the routes

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/api/v3/w/", routes); // Use the routes defined in web_routes.ts

// listen on the port defined in the .env file or default to 3000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
