const express = require('express');
const router = express.Router();

// Route: GET api/post/test
// Desc: Test post route
// Access: Public
router.get('/test', (req, res) => res.json({msg: "Post Works"}));

module.exports = router;