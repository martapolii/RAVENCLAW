import express from 'express';
import { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import { requireSignin, hasAuthorization, admin } from '../controllers/auth.controller.js';

const router = express.Router();

// Gets all questions
router.get('/', getQuestions);

// Gets a question by ID
router.get('/:id', getQuestion);

// Creates a new question (protected, admin only)
router.post('/', requireSignin, hasAuthorization, admin, createQuestion);

// Updates a question by ID (protected, admin only)
router.put('/:id', requireSignin, hasAuthorization, admin, updateQuestion);

// Deletes a question by ID (protected, admin only)
router.delete('/:id', requireSignin, hasAuthorization, admin, deleteQuestion);

export default router;