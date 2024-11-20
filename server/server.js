// Implement the server
import express from 'express'; ///import express module
import config from './../config/config.js' ;
import app from './express.js';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configures dotenv to read the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//mongodb connection
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// serve static files from the dist folder when root URL (/) is accessed 
app.use("/", express.static(path.join(__dirname, '../client/dist'))); // changed from public to dist
app.get("/api/v1", (req, res) => { // root handler for GET requests to /api/v1
  res.json({
    project: "React and Express Boilerplate",
    from: "Vanaldito",
  });
});
app.get("/*", (_req, res) => { // catch-ll route for all other requests
  res.sendFile(path.join(__dirname, "../client/dist", "index.html")); // serves index.html from public directory
})

  
// starts the server
app.listen(config.port, (err) => { // starts server on port specified in ./config/config.js
  if (err) {
    console.log(err); // logs errors if any
  }
  console.info('Server started on port %s.', config.port); // Log server startup info
});
