// Implement the server
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

  
// starts the server
app.listen(config.port, (err) => {
  if (err) {
    console.log(err); // logs errors if any
  }
  console.info('Server started on port %s.', config.port); // Log server startup info
});
