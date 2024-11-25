import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../utils/auth.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to fetch user details (protected)
router.get('/:id', protect, getUser);

// Route to update user details (protected)
router.put('/:id', protect, updateUser);

// Route to delete a user (admin only)
router.delete('/:id', protect, admin, deleteUser);

export default router;
