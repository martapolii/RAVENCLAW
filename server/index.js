// imports the configured express app and route handlers
import app from './express.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

// sets up API routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

// default route to check if the server is running
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the User application." });
});