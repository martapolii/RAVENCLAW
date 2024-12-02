import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Fetches all users
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().select('username email role');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getUsers:', error.message);
        res.status(500).json({ message: 'Server error'});
    }
};

// Registers a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body; //added role or else can't create admin user

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create and save the user
        const user = new User({
            username,
            email,
            password,
            role: role || 'user', // set role to user if not provided, so you can make admin users, and it doesnt just default to user every time
        });

        await user.save();

        // Generate a token
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logs in a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email }); // find user by email
        if (!user) { 
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // use comparePassword logic from the userr model
        const isAuthenticated = await user.comparePassword(password); //will compare password to hashed password (was giving me issues before because I was trying to log in with an un-hashed password)
        if (!isAuthenticated) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // generate a token
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        res.cookie('authCookie', token, { // set token in a cookie so it can be cleared on sign out
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1hr
        })

        res.status(200).json({ // respond w user details
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            //token, - no need bc stored in cookie now
        });
    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fetches user details
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUser:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Updates user details
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body; // added password 

        const updateData = { username, email }; // store update data in object

        if (password) { // if password is provided, hash it and add to update data object
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error in updateUser:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Deletes a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleteUser:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Signs out a user 
export const signoutUser = async (_req, res) => {
    // need to clear cookie used in sign in
    res.clearCookie('authCookie', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'User signed out successfully' });
};