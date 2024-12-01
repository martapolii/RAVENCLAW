import jwt from 'jsonwebtoken';

// Middleware to protect routes 
export const protect = (req, res, next) => {
  const token =
    req.cookies.authCookie || req.headers.authorization?.split(" ")[1];

  if (!token) { // if no token is found, deny access
    return res.status(401).json({ message: "Not authorized, no token found." });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );
    req.user = decoded; // get user info from token
    next();
  } catch (error) { // if it's the wrong token, deny access
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware for admin-only access
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') { // if user has 'admin' set as their role, allow access to next middleware
      next();
  } else {
      res.status(403).json({ message: 'Not authorized as admin' });
  }
};