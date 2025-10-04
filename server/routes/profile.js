const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// Get profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ updatedAt: -1 });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update profile (protected)
router.post('/', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (profile) {
      // Update existing profile
      Object.assign(profile, req.body);
      profile.updatedAt = new Date();
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile(req.body);
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;