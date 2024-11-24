import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../utils/auth.js';

// initializes router
const router = express.Router();

// user registration
router.post('/register', registerUser);

// user login
router.post('/login', loginUser);

// gets user by ID (protected)
router.get('/:id', protect, getUser);

// updates user by ID (protected)
router.put('/:id', protect, updateUser);

// deletes user by ID (protected)
router.delete('/:id', protect, deleteUser);

// exports the router
export default router;
