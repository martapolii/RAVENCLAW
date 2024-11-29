import { expressjwt } from 'express-jwt';
import config from './../../config/config.js';

// methods for protected routes

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