// Middleware to protect routes (e.g., requiring authentication)
export const protect = (req, res, next) => {
    try {
        // Example logic: check if a user token exists
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Token validation logic here (e.g., decode JWT)
            req.user = { id: '12345', isAdmin: false }; // Mock user for now
            next();
        } else {
            res.status(401).json({ message: 'Not authorized, token missing or invalid' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

// Middleware to allow only admin access
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};
