const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get current active resume
router.get('/current', async (req, res) => {
  try {
    const resume = await Resume.findOne({ isActive: true }).sort({ uploadedAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'No active resume found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload new resume (protected)
router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'portfolio/resume' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Deactivate previous resumes
    await Resume.updateMany({}, { isActive: false });

    // Create new resume record
    const resume = new Resume({
      fileUrl: result.secure_url,
      fileName: req.file.originalname,
      isActive: true
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;