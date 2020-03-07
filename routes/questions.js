const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Question = require('../models/Question');
const User = require('../models/User');

//@route    POST question
//@desc     Create a question
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newQuestion = new Question({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });

      const question = await newQuestion.save();

      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET questions
//@desc     Get all questions
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ likes: 1 })
      .limit(20);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET question/:id
//@desc     Get question by ID
//@access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE question/:id
//@desc     Delete a question
//@access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    //check user
    if (question.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await question.remove();

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

//@route    PUT question/like/:id
//@desc     Like a question
//@access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    //check if the question has already been liked
    if (
      question.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Question already liked' }] });
    }
    question.likes.unshift({ user: req.user.id });

    await question.save();

    res.json(question.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT question/unlike/:id
//@desc     Unlike a question
//@access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    //check if the question has already been liked
    if (
      question.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Question has not been liked' }] });
    }
    //Get remove index
    const removeIndex = question.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    question.likes.splice(removeIndex, 1);

    await question.save();

    res.json(question.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST question/answer/:id
//@desc     Answer on a question
//@access   Private
router.post(
  '/answer/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const question = await Question.findById(req.params.id);

      const newAnswer = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      question.answers.unshift(newAnswer);

      await question.save();

      res.json(question.answers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE question/answer/:id/:answer_id
//@desc     Delete answer on a question
//@access   Private
router.delete('/answer/:id/:answer_id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    //Take answer from a question
    const answer = question.answers.find(
      answer => answer.id === req.params.answer_id
    );

    if (!answer) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Answer does not exist' }] });
    }

    if (answer.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    //Get remove index
    const removeIndex = question.answers
      .map(answer => answer.user.toString())
      .indexOf(req.user.id);

    question.answers.splice(removeIndex, 1);

    await question.save();

    res.json(question.answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
