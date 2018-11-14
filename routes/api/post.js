const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post')

// Profile model
const Profile = require('../../models/Profile')

// Validation
const validatePostInput = require('../../validation/post')

// Route: GET api/post/test
// Desc: Test post route
// Access: Public
router.get('/test', (req, res) => res.json({msg: "Post Works"}));

// Route: GET api/posts
// Desc: Get posts
// Access: Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
});

// Route: GET api/posts/:id
// Desc: Get post by id
// Access: Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }))
});
    

// Route: POST api/post
// Desc: Create post
// Access: Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Deconstructing errors and isValid from the validation post.js file and passing in req.body
  const { errors, isValid } = validatePostInput(req.body);

  // Check our validation
  if (!isValid) {
    // if any errors, send 400 with an object
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost
    .save()
    .then(post => res.json(post));
});

// Route: DELETE api/:id
// Desc: Delete post
// Access: Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notautherized: 'User not autherized' })
          }
          // Delete
          post.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    })
});

module.exports = router;
