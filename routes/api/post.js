const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post')

// Validation
const validatePostInput = require('../../validation/post')

// Route: GET api/post/test
// Desc: Test post route
// Access: Public
router.get('/test', (req, res) => res.json({msg: "Post Works"}));

// Route: GET api/post
// Desc: Get post
// Access: Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404))
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

module.exports = router;
