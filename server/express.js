// Import modules
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors' // handles requests from back end
import helmet from 'helmet'

// Define express app
const app = express()
const cors = require('cors');

// Configure modules
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors({
  origin: 'https://raven-claw.netlify.app/', // Replace with your frontend domain
  credentials: true, // Allow cookies
})
);

// Export express app
export default app