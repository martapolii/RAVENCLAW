import express from 'express';
import { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import { protect, admin } from '../utils/auth.js';

const router = express.Router();

// gets all questions
router.route('/api/triviaquestions').get(getQuestions);

// gets a question by ID
router.get('/api/:id', getQuestion);

// creates a new question (protected, admin only)
router.post('/api', protect, admin, createQuestion);

// updates a question by ID (protected, admin only)
router.put('/api/:id', protect, admin, updateQuestion);

// deletes a question by ID (protected, admin only)
router.delete('/api/:id', protect, admin, deleteQuestion);

export default router;