// Middleware to protect routes (mocked for development)
export const protect = (req, res, next) => {
    req.user = { id: 'mock-user-id', isAdmin: false }; // Mock user data
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