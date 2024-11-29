// Import modules
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

// Define express app
const app = express()

// Configure modules
app.use(express.json()); // for parsing incomng requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // for parsing incoming requests with URL-encoded payloads
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Export express app
export default app