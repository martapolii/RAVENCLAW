import express from 'express';
import { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import { protect, admin } from '../utils/auth.js';

const router = express.Router();

// Gets all questions
router.get('/', getQuestions);

// Gets a question by ID
router.get('/:id', getQuestion);

// Creates a new question (protected, admin only)
router.post('/', protect, admin, createQuestion);

// Updates a question by ID (protected, admin only)
router.put('/:id', protect, admin, updateQuestion);

// Deletes a question by ID (protected, admin only)
router.delete('/:id', protect, admin, deleteQuestion);

export default router;