// Import modules
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors' // handles requests from back end
import helmet from 'helmet'

// Define express app
const app = express()

// Configure modules
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors()) // so front + back can run on different ports

// Export express app
export default app