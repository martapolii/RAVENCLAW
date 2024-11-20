//serves static files from the src folder

//import and define express router and paths
const express = require("express");
const path = require("path");
const router = express.Router();
const { fileURLToPath } = require("url");

// serve static files based on the environment
const isProduction = process.env.NODE_ENV === "production";
const staticFolder = isProduction
  ? path.join(__dirname, "../../../client/dist/assets") // in development, the assets are served from the public folder
  : path.join(__dirname, "../../../client/public/assets"); // in production, the assets are served from the dist folder

// define regex patterns for images and videos
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
const videoRegex = /\/.+\.(mp4|ogv)$/

// iterate over regex patterns and create a route for each to src folder 

// route to serve images
router.get(imageRegex, (req, res) => {
  const filePath = path.join(staticFolder, req.path);
  res.sendFile(filePath, (err) => {
    if (err) { // error handling
      console.error("Error serving file:", err);
      res.status(404).send("File not found.");
    }
  });
});

// route to serve videos
router.get(videoRegex, (req, res) => {
  const filePath = path.join(staticFolder, req.path);
  res.sendFile(filePath, (err) => {
    if (err) { // error handling
      console.error("Error serving file:", err);
      res.status(404).send("File not found.");
    }
  });
});


module.exports = router;