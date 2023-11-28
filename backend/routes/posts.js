const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/posts', async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the user making the request
      const user = await User.findById(decoded.userId);
      // Check if the user has the 'admin' role
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied. Only admin users can create posts.' });
      }
  
      const { title, content, category, important } = req.body;
      const post = new Post({
        title,
        content,
        category,
        important,
        author: user._id,
      });
      await post.save();
  
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  


// Get all posts sorted by importance (descending) and createdAt (descending)
router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find().sort({ important: -1, createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//  important posts only
router.get('/important-posts', async (req, res) => {
    try {
      const importantPosts = await Post.find({ important: true }).sort({ updatedAt: -1 });
      res.json(importantPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Get a specific post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  router.delete('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
