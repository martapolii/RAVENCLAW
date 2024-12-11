import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',  // Specifies development mode
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",  // Secret key for signing JWT
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mernproject',
};

// Logs the MongoDB URI for debugging
console.log(`MongoDB URI: ${config.mongoUri}`);  

export default config;