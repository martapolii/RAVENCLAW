import TriviaQuestion from '../models/trivia_questions.model.js'; // Ensure correct path

// Fetch all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await TriviaQuestion.find(); // Fetch all questions from the trivia_questions collection

    if (questions.length === 0) {
      console.log('No questions found in the database.');
    }

    res.json(questions); // Return the questions as JSON
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

// Fetch a question by ID
export const getQuestion = async (req, res) => {
  try {
    const question = await TriviaQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    const newQuestion = new TriviaQuestion({
      question,
      options,
      correctAnswer,
    });

    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    const updatedQuestion = await TriviaQuestion.findByIdAndUpdate(
      req.params.id,
      { question, options, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await TriviaQuestion.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};
