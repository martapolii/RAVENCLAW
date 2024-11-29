import express from 'express';
import { getUsers, registerUser, loginUser, getUser, updateUser, deleteUser, signoutUser } from '../controllers/userController.js';
import { requireSignin, hasAuthorization, admin } from '../utils/auth.js';

const router = express.Router();

// User API Routes declared here

// Route to list all users (admin only) 
router.get('/', getUsers);

// Route to register a new user
router.post('/register', registerUser);

// Route to fetch user details (protected) 
router.get('/:id', requireSignin, getUser);

// Route to update user details (protected) 
router.put('/:id', requireSignin, hasAuthorization, updateUser);

// Route to delete a user (admin only) 
router.delete('/:id', requireSignin, hasAuthorization, admin, deleteUser);

//AUTH ROUTES
  // Route to log in a user
  router.post('/login', loginUser);

  // Route to signout a user
  router.get('/signout', signoutUser);

export default router;
