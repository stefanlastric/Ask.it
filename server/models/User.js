const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  brojkomentara: {
    type: Number,
    default: 0
  },
  website: {
    type: String
  },
  country: {
    type: String
  },
  work: {
    type: String
  },
  age: {
    type: String
  },
  experience: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model('user', UserSchema);
