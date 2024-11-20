// imports express and necessary modules
const express = require('express');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../utils/auth');

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
module.exports = router;