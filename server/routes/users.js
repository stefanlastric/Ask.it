const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route    GET users
// @desc     Get all users sorted by comment number
// @access   Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ brojkomentara: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET user/:id
//@desc     Get user by ID
//@access   Private
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Post new password
// @desc    Change password
// @access  Public
router.post(
  '/password',
  [
    // Express validation
    check(
      'password',
      'Password must be atleast with 4 or more characters'
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('password');
      const pass = req.body.password;
      // Password encrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(pass, salt);

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

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
      User.find()
        .limit()
        .skip();
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

      // Return jsonwebtoken
      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
