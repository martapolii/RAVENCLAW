// Import modules
import express from 'express'; // import express module
import config from './../config/config.js'; // import configuration
import dotenv from 'dotenv'; // import dotenv for environment variables
import path from 'path'; // import path module for file and directory paths
import mongoose from 'mongoose'; // import mongoose for MongoDB connection
import { fileURLToPath } from 'url'; // import fileURLToPath for ES module compatibility
import assetsRouter from './routes/assets-router.js'; // import assets-router
import userRoutes from './routes/userRoutes.js'; // import user routes
import questionRoutes from './routes/questionRoutes.js'; // import question routes

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configures dotenv to read the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize express app
const app = express();

// MongoDB connection
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

// Start the server
app.listen(config.port, (err) => {
  if (err) {
    console.error(err); // Log any errors that occur
  } else {
    console.info('Server started on port %s.', config.port); // Log server startup info
  }
});
