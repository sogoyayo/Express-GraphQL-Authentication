const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
