// Create web server
// Create a new comment
// Edit a comment
// Delete a comment
// Get a comment
// Get all comments
// Get all comments for a post

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

// Create a new comment
router.post('/', (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    post: req.body.post
  });
  comment.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Comment created successfully' });
    }
  });
});

// Get all comments
router.get('/', (req, res) => {
  Comment.find().populate('post').exec((err, comments) => {
    if (err) {
      res.send(err);
    } else {
      res.json(comments);
    }
  });
});

// Get a comment
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.send(err);
    } else {
      res.json(comment);
    }
  });
});

// Edit a comment
router.put('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      res.send(err);
    } else {
      comment.content = req.body.content;
      comment.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: 'Comment updated successfully' });
        }
      });
    }
  });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  Comment.remove({ _id: req.params.id }, (err, comment) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Comment deleted successfully' });
    }
  });
});

// Get all comments for a post
router.get('/post/:id', (req, res) => {
  Comment.find({ post: req.params.id }).populate('post').exec((err, comments) => {
    if (err) {
      res.send(err);
    } else {
      res.json(comments);
    }
  });
});

module.exports = router;