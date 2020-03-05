const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @route   GET users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

// @route   Post users
// @desc    Register route
// @access  Public
router.post(
  '/',
  [
    // Express validation
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check(
      'password',
      'Password must be atleast with 4 or more characters'
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      // Password encrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.send('User registered.');
      // Return jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
