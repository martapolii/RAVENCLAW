const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const triviaQuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], 
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);

module.exports = TriviaQuestion;
