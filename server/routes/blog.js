const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const auth = require('../middleware/auth');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured blog posts
router.get('/featured', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true, featured: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Increment view count
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blog post (protected)
router.post('/', auth, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog post (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog post (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;