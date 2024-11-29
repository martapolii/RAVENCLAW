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
  hashedPassword: {
    type: String,
    required: 'Password is required', 
  },
  salt: String
});

// password handled as a virtual field
userSchema.virtual("password")
  .set(function (password) {
    // salt generation logic
    this._password = password;
    this.salt = this.makeSalt();
    //this.hashedPassword = password;
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.path("hashedPassword").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

// encryption logic
userSchema.methods = {
  authenticate: function (plainText) { // verifies sign-in
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  encryptPassword: function (password) { // generates encrypted haash & unique salt value
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () { // generates unique salt value
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
  

const User = mongoose.model('User', userSchema);

export default User;
