import React from 'react';

const QuestionList = () => {
  const sampleQuestions = ['What is Harry Potter’s middle name?', 'What house is Luna Lovegood in?'];

  const pageStyles = {
    backgroundColor: '#0e1a40', // Ravenclaw blue
    color: '#946b2b', // Gold text color
    fontFamily: "'Georgia', serif", 
    textAlign: 'center',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    marginTop: '50px',
  };

  const listStyles = {
    listStyleType: 'none', // No bullets for list items
    padding: '0',
  };

  const listItemStyles = {
    backgroundColor: '#1f2a59', // Darker blue background for list items
    color: '#c0c0c0', // Silver text color for questions
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    fontSize: '1.1em',
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={pageStyles}>
      <h2>Trivia Questions</h2>
      <p>Test your knowledge of the wizarding world! Answer these questions to prove your Ravenclaw brilliance.</p>
      <ul style={listStyles}>
        {sampleQuestions.map((question, index) => (
          <li key={index} style={listItemStyles}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;