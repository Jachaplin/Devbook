const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post')

// Route: GET api/post/test
// Desc: Test post route
// Access: Public
router.get('/test', (req, res) => res.json({msg: "Post Works"}));

// Route: POST api/post
// Desc: Create post
// Access: Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id
  });

  newPost
    .save()
    .then(post => res.json(post));
});

module.exports = router;
