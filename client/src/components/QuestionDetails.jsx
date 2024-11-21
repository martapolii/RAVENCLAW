import React from 'react';

const QuestionDetails = ({ question = 'What is the name of Hagrid’s pet dragon?' }) => {
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

  const formStyles = {
    backgroundColor: '#1f2a59', // A darker blue background for form
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    marginTop: '20px',
  };

  const inputStyles = {
    padding: '10px',
    margin: '10px',
    width: '250px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1em',
    color: '#1f2a59', // Dark blue text for input
    backgroundColor: '#c0c0c0', // Silver background for input fields
  };

  const buttonStyles = {
    backgroundColor: '#fff', // White button
    color: '#946b2b', // Dark blue text color
    padding: '10px 20px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
  };

  const buttonHoverStyles = {
    backgroundColor: '#1f2a59', // Dark blue on hover
    color: '#c0c0c0', // Silver text on hover
  };

  return (
    <div style={pageStyles}>
      <h2>Question Details</h2>
      <p>{question}</p>
      <form style={formStyles}>
        <label style={{ color: '#c0c0c0' }}>Your Answer:</label>
        <input type="text" placeholder="Type your answer here" style={inputStyles} />
        <button
          type="submit"
          style={buttonStyles}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyles.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyles.backgroundColor}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionDetails;
