import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

// Fetches all users
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().select('username email password role');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getUsers:', error.message);
        res.status(500).json({ message: 'Server error'});
    }
};

// Registers a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate a token
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
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
        const { email, password } = req.body; //POST request object recieves email + password

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email }); // retrieves matching user 
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            config.JWT_SECRET)
            res.cookie('t', token, { expire: new Date() + 9999 }) 
            return res.json({ 
                token, 
                user: { 
                    id: user._id,
                    username: user.username,
                    email: user.email,
                } 
            })
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
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email },
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

// Signs out a user - GET request that clears the cookie
export const signoutUser = async (_req, res) => {
    res.clearCookie("t")
    return res.status('200').json({ 
    message: "Signed out successfully"
}) 
};


    
 
