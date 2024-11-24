const TriviaQuestion = require('../models/trivia_questions.model');

// fetches all trivia questions
const getQuestions = async (req, res) => {
  try {
    const triviaQuestion = await TriviaQuestion.find(); 
    res.status(200).json(contact); 
  } catch (error) {
    res.status(500).json({
      error: 'Could not retrieve trivia questions'
    });
  } 
};

// fetches a specific question by ID
const getQuestion = async (req, res) => {
};

// adds a new trivia question
const createQuestion = async (req, res) => {
};

// updates an existing trivia question
const updateQuestion = async (req, res) => {
};

// deletes a trivia question
const deleteQuestion = async (req, res) => {
};

module.exports = { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion };
