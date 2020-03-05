const express = require('express');
const router = express.Router();

// @route   GET questions
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Questions route'));

module.exports = router;
