import React, { useState, useEffect } from 'react';
import '../css/AdminQuestions.css'; //imported css file

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Add a new question
  const addQuestion = async () => {
    if (!newQuestion || !newAnswer) {
      alert('Both question and answer are required!');
      return;
    }
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newQuestion, options: ['Answer'], correctAnswer: newAnswer }),
      });
      const addedQuestion = await response.json();
      setQuestions([...questions, addedQuestion]);
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  // Delete a question
  const deleteQuestion = async (id) => {
    try {
      await fetch(`/api/questions/${id}`, { method: 'DELETE' });
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="container">
    <h2 className="header">Admin - Manage Trivia Questions</h2>
    <div className="input-group">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Enter new question"
      />
      <input
        type="text"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        placeholder="Enter correct answer"
      />
      <button className="button" onClick={addQuestion}>
        Add Question
      </button>
    </div>
    <ul className="question-list">
      {questions.map((q) => (
        <li key={q._id} className="question-item">
          <strong>{q.question}</strong> - {q.correctAnswer}
          <button className="button" onClick={() => deleteQuestion(q._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default AdminQuestions;