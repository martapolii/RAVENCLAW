import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from '../../config/config.js';
import bcrypt from 'bcryptjs';

// Logs in a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '10h' }
        );

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Signs out a user - GET request that clears the cookie
export const signoutUser = async (_req, res) => {
    res.clearCookie("t")
    return res.status('200').json({ 
    message: "Signed out successfully"
}) 
};


// methods for protected routes:

// make sure user is signed in to access certain routes
export const requireSignin = expressjwt({ 
    secret: config.jwtSecret, 
    algorithms: ['HS256'],
    userProperty: 'auth'
    });
    
// to make sure user is only updating their own information
export const hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status("403").json({
        error: "User is not authorized",
        });
    }
    next();
};

// Middleware for admin-only access
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};