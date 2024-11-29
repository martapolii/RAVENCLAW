import TriviaQuestion from '../models/trivia_questions.model.js';

// Fetches all trivia questions
export const getQuestions = async (req, res) => {
    try {
        const questions = await TriviaQuestion.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fetches a specific question by ID
export const getQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await TriviaQuestion.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error('Error fetching question:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Adds a new trivia question
export const createQuestion = async (req, res) => {
    try {
        const { question, options, correctAnswer } = req.body;

        if (!question || !Array.isArray(options) || options.length < 2 || correctAnswer === undefined) {
            return res.status(400).json({ message: 'Invalid input: All fields are required, and options must be an array with at least two items.' });
        }

        const newQuestion = new TriviaQuestion({ question, options, correctAnswer });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error creating question:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Updates an existing trivia question
export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, options, correctAnswer } = req.body;

        const updatedQuestion = await TriviaQuestion.findByIdAndUpdate(
            id,
            { question, options, correctAnswer },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Deletes a trivia question
export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedQuestion = await TriviaQuestion.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Error deleting question:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};