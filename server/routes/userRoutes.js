import express from 'express';
import User from '../models/user.model.js'; // ensure the User model is imported
import { getUsers, registerUser, loginUser, getUser, updateUser, deleteUser, signoutUser } from '../controllers/userController.js';
import { protect, admin } from '../utils/auth.js';

const router = express.Router();

// user api routes declared here

// route to list all users (admin only)
router.get('/', protect, admin, getUsers); // fetches all users, only accessible to admin

// route to register a new user
router.post('/register', registerUser); // user registration

// route to log in a user
router.post('/login', loginUser); // user login

// route to fetch current logged-in user's profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // fetch user from database using ID from token
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      score: user.highScore, // ensure highScore matches your model
    });
  } catch (error) {
    console.error('error in /me endpoint:', error.message); // log detailed error
    res.status(500).json({ message: 'server error' });
  }
});

// other user routes
router.get('/:id', protect, getUser); // fetch user by id
router.put('/:id', protect, updateUser); // update user
router.delete('/:id', protect, deleteUser); // delete user
router.post('/signout', protect, signoutUser); // user logout

export default router;