 
import mongoose from 'mongoose'; // use import/export syntax
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

//const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);
//module.exports = TriviaQuestion;

export default mongoose.model('TriviaQuestion', triviaQuestionSchema, 'trivia_questions'); // use import/export syntax
