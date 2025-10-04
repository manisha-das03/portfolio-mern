const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple admin login (you can expand this later)
const ADMIN_EMAIL = 'admin@portfolio.com';
const ADMIN_PASSWORD = 'admin123'; // Change this in production

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;