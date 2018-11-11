const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load keys
const keys = require('../../config/keys');

// Load Input validation
const validateRegisterInput = require('../../validation/register')

// Load User Model
const User = require('../../models/User');

// Route: GET api/users/test
// Desc: Test users route
// Access: Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// Route: POST api/users/register
// Desc: register users route
// Access: Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, // avatar: avatar,
          password: req.body.password
        });

        // Hash out the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// Route: POST api/users/login
// Desc: Login users / Returning JWT Token
// Access: Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({email})
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // res.json({msg: 'Success'});
            // User Matched

            // Create jwt payload
            const payload = { 
              id: user.id, 
              name: user.name, 
              avatar: user.avatar
            };

            // Sign Token
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 3600 }, 
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              });
          } else {
            return res.status(400).json({ password: 'Password incorrect' })
          }
        })
    });
});

// Route: GET api/users/current
// Desc: Return current user
// Access: Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // res.json({ msg: 'Success' })
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})

module.exports = router;
