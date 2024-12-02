// Import modules
import express from 'express';
import cors from 'cors'; 
import config from './../config/config.js';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import assetsRouter from './routes/assets-router.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configures dotenv to read the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize express app
const app = express();

// Enable CORS for all origins (adjust as needed)
app.use(cors());

// Add middleware to parse JSON and URL-encoded request bodies
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// MongoDB connection
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware for assets
app.use('/assets', assetsRouter);

// Set up API routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

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

// Start the server
app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('Server started on port %s.', config.port);
  }
});
