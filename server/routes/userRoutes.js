import express from 'express';
import { getUsers, registerUser, loginUser, getUser, updateUser, deleteUser, signoutUser } from '../controllers/userController.js';
import { protect, admin } from '../utils/auth.js';

const router = express.Router();

// User API Routes declared here

// Route to list all users (admin only) 
router.get('/', protect, admin, getUsers); // tested

// Route to register a new user
router.post('/register', registerUser); // tested

// Route to log in a user
router.post('/login', loginUser); // tested

// Route to fetch user details (protected) 
router.get('/:id', protect, getUser); // tested

// Route to update user details (protected) 
router.put('/:id', protect, updateUser); // tested

// Route to delete a user (protected) 
router.delete('/:id', protect, deleteUser); // tested

// Route to signout a user
router.post('/signout', protect, signoutUser); // tested

// GET /api/users/me - additional route to get current logged in user's profile, for front end integration
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.username,
      email: user.email,
      score: user.highScore,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

