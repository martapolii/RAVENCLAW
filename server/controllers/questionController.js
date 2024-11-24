//const TriviaQuestion = require('../models/trivia_questions.model');
import TriviaQuestion from '../models/trivia_questions.model.js';

  // fetches all trivia questions
  export const getQuestions = async (req, res) => {
    try {
      const triviaQuestion = await TriviaQuestion.find(); 
      res.status(200).json(triviaQuestion); 
    } catch (error) {
      res.status(500).json({
        error: 'Could not retrieve trivia questions'});
    } 
  };

  // fetches a specific question by ID
  export const getQuestion = async (req, res) => {
  };

  // adds a new trivia question
  export const createQuestion = async (req, res) => {
  };

  // updates an existing trivia question
  export const updateQuestion = async (req, res) => {
  };

  // deletes a trivia question
  export const deleteQuestion = async (req, res) => {
  };




