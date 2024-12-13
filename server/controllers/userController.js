import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// fetches all users
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().select('email role'); // removed username field
        res.status(200).json(users);
    } catch (error) {
        console.error('error in getUsers:', error.message);
        res.status(500).json({ message: 'server error' });
    }
};

// registers a new user
export const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body; // added role for admin creation

        // validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }

        // check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'account with this email already exists' });
        }

        // create and save the user
        const user = new User({
            email,
            password,
            role: role || 'user', // defaults role to 'user', can be updated by admin
        });

        await user.save();

        // generate a token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        // set the token as an HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        });

        res.status(201).json({
            id: user._id,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error('error in registerUser:', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// logs in a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        // compare the password with the hashed password
        const isAuthenticated = await user.comparePassword(password);
        if (!isAuthenticated) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        console.log('user logged in:', user.email);

        // generate a token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        // set token in a cookie
        res.cookie('authCookie', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({
            id: user._id,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error('error in loginUser:', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// fetches user details
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        // restrict access to the user or admin
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).json({ message: 'not authorized to see user details' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('error in getUser:', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// updates user details
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        // restrict access to the user or admin
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).json({ message: 'not authorized to update user' });
        }

        const updateData = { email }; // update email only

        if (password) { // hash password if provided
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('error in updateUser:', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// deletes a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // restrict access to the user or admin
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).json({ message: 'not authorized to delete user' });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        console.error('error in deleteUser:', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
};

// signs out a user
export const signoutUser = async (_req, res) => {
    res.clearCookie('authCookie', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'user signed out successfully' });
};