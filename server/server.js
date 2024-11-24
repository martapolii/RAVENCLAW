// Implement the server
import express from 'express'; ///import express module
import config from './../config/config.js' ;
import app from './express.js';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import assetsRouter from "./routes/assets-router.js"; // import assets-router
import userRoutes from './routes/userRoutes.js'; // import user routes
import questionRoutes from "./routes/questionRoutes.js"; // import question-router

// get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configures dotenv to read the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize express app
//const app = express(); - error: "identifier 'app' has already been declared"

//mongodb connection
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware for assets
  app.use('/assets', assetsRouter); // Serve specific assets

// Set up API routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/questions', questionRoutes); // Question-related routes


// Serve production files from the dist folder for the root URL (/)
app.use('/', express.static(path.join(__dirname, '../client/dist')));
// Default route to check if the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the User application.' });
});

// Catch-all route for serving React's index.html
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
  
// starts the server
app.listen(config.port, (err) => { // starts server on port specified in ./config/config.js
  if (err) {
    console.log(err); // logs errors if any
  }
  console.info('Server started on port %s.', config.port); // Log server startup info
});
