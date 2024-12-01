import express from 'express';
import { getUsers, registerUser, loginUser, getUser, updateUser, deleteUser, signoutUser } from '../controllers/userController.js';
import { protect, admin } from '../utils/auth.js';

const router = express.Router();

// User API Routes declared here

// Route to list all users (admin only) 
router.get('/', protect, admin, getUsers);

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

// Route to signout a user
router.post('/signout', protect, signoutUser);

export default router;

