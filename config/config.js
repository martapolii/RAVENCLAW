// server-side related configuration variables

const config = {
  env: process.env.NODE_ENV || 'development', // specify development mode
  port: process.env.PORT || 3000, // listening port
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", // secret key to be used to sign JWT
  mongoUri: process.env.MONGODB_URI || // location of MongoDB database instance
  process.env.MONGO_HOST ||
  'mongodb://' + (process.env.IP || 'localhost') + ':' + 
  (process.env.MONGO_PORT || '27017') +
  '/mernproject'
  }

  export default config
