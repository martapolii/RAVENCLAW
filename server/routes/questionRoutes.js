const express = require('express');
const { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const { protect, admin } = require('../utils/auth');
const router = express.Router();

// gets all questions
router.get('/', getQuestions);

// gets a question by ID
router.get('/:id', getQuestion);

// creates a new question (protected, admin only)
router.post('/', protect, admin, createQuestion);

// updates a question by ID (protected, admin only)
router.put('/:id', protect, admin, updateQuestion);

// deletes a question by ID (protected, admin only)
router.delete('/:id', protect, admin, deleteQuestion);

module.exports = router;