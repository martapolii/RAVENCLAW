import express from 'express';
import { getUsers, registerUser,  getUser, updateUser, deleteUser} from '../controllers/userController.js';
import { requireSignin, hasAuthorization, admin } from '../controllers/auth.controller.js';

const router = express.Router();

// Middleware to validate user ID, so GET PUT and DELETE routes have access to user data
router.param('userId', async (req, res, next, id) => {
  try {
      const user = await user.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      req.profile = user; // Attach user to the request, used in hasAuthorization to compare signed in user w/ user id request
      next();
  } catch (error) {
      console.error('Error in user param middleware:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Route to list all users (admin only) 
router.get('/', requireSignin, admin, getUsers);

// Route to register a new user
router.post('/register', registerUser);

// Route to fetch user details (protected) 
router.get('/:id', requireSignin, hasAuthorization, getUser);

// Route to update user details by ID (protected) 
router.put('/:id', requireSignin, hasAuthorization, updateUser);

// Route to delete a user (admin only) 
router.delete('/:id', requireSignin, hasAuthorization, admin, deleteUser);

export default router;
