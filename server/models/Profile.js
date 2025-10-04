const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  profileImage: {
    type: String
  },
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    }
  }],
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);