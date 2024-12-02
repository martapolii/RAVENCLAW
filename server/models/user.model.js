import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: 'Name is required',
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
  hashed_password: {
    type: String,
    required: 'Password is required', 
  },
  salt: String
});

// password validation
userSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    //this.salt = this.makeSalt();
    this.hashed_password = password;
    //this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);


const User = mongoose.model('User', userSchema);

export default User;
