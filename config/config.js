import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',  // specify development mode
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",  // secret key to be used to sign JWT
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mernproject' // Fallback to local MongoDB if no URI provided
};

console.log(config.mongoUri);  // logs the MongoDB URI for debugging purposes
export default config;
