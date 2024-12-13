import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    //required: 'Name is required',   *made this optional as user registration doesn't require a username, so this was causing issues when attempting to register an account
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists', 
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  highScore: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: 'Password is required', 
  },
  //bcrypt handles salt
});

// middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// method to compare password to hashed password automatically
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
