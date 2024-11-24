import mongoose from 'mongoose';

const triviaQuestionSchema = new mongoose.Schema({
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

export default TriviaQuestion;
