import React, { useState } from 'react';


const AdminQuestions = () => {
  
  const [questions, setQuestions] = useState([
    { id: 1, question: 'Who is known as the Boy Who Lived?', answer: 'Harry Potter' },
    { id: 2, question: 'What house is Harry Potter sorted into?', answer: 'Gryffindor' },
    { id: 3, question: 'Who was the headmaster of Hogwarts during Harry Potter\'s first year?', answer: 'Albus Dumbledore' },
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  
  const addQuestion = () => {
    if (!newQuestion || !newAnswer) {
      alert('Both question and answer are required!');
      return;
    }
    const newQ = {
      id: questions.length + 1,
      question: newQuestion,
      answer: newAnswer,
    };
    setQuestions([...questions, newQ]);
    setNewQuestion('');
    setNewAnswer('');
  };

  
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

 
  const containerStyle = {
    backgroundColor: '#f4f4f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
  };

  const headerStyle = {
    color: '#0e1a40', 
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
  };

  const listItemStyle = {
    backgroundColor: '#ffffff',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#0e1a40', 
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d9534f', 
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5bc0de', 
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Admin - Manage Trivia Questions</h2>

   
      <div>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter new question"
          style={inputStyle}
        />
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Enter answer"
          style={inputStyle}
        />
        <button onClick={addQuestion} style={addButtonStyle}>
          Add Question
        </button>
      </div>

      
      <ul style={listStyle}>
        {questions.map((question) => (
          <li key={question.id} style={listItemStyle}>
            <div>
              <strong>{question.question}</strong>
              <p>{question.answer}</p>
            </div>
            <button
              style={deleteButtonStyle}
              onClick={() => deleteQuestion(question.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminQuestions;
