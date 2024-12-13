import React, { useState, useEffect } from 'react';
import '../css/buttons.css';

const GamePlay = () => {
  const [questions, setQuestions] = useState([]); // State to store questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/questions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuestions(data || []);  // Ensure it's an array
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError(error.message); // Set the error message in state
      setLoading(false); // Set loading to false on error
    }
  };

  fetchQuestions();
}, []);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOption("");
    } else {
      alert(`Game Over! Your score is: ${score}/${questions.length}`);
    }
  };

  return (
    <div className="gameplay-container" style={gameplayContainerStyle}>

      <h2 style={headerStyle} >Harry Potter Trivia</h2>
      
      {/* Check if questions are available and not empty */}
      {questions.length > 0 ? (
        <>
          <p style={questionStyle}>
            {questions[currentQuestionIndex]?.question}
          </p>
          <div style={optionsContainerStyle}>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{
                  ...optionButtonStyle,
                  backgroundColor:
                    selectedOption === option
                      ? option === questions[currentQuestionIndex]?.correctAnswer
                        ? "#4CAF50"
                        : "#f44336"
                      : "#946b2b",
                }}
                onMouseOver={(e) => {
                  if (!isAnswered) {
                    e.target.style.backgroundColor = optionButtonHoverStyle.backgroundColor;
                  }
                }}
                onMouseOut={(e) => {
                  if (!isAnswered) {
                    e.target.style.backgroundColor = optionButtonStyle.backgroundColor;
                  }
                }}

                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <button onClick={handleNextQuestion} className="base-button next-question">
              Next Question
            </button>
          )}
          <div style={scoreContainerStyle}>
            <p>Score: {score}</p>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
        </>
      ) : (
        <div>Loading questions...</div>
      )}
    </div>
  );  
};

// Inline styles for GamePlay component
// Inline styles for GamePlay component
const gameplayContainerStyle = {
  backgroundColor: "#0e1a40",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: '20px auto',
  textAlign: "center",
  color: "#ffffff",
};

const headerStyle = { // Added this to make the color scheme between GamePlay and UserProfile consistent - T
  color: '#946b2b', 
  fontSize: '1.8rem',
  marginBottom: '20px',
  fontFamily: "'Georgia', serif",
};

const questionStyle = {
  fontSize: "1.5rem",
  marginBottom: "20px",
};

const optionsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
};

const optionButtonStyle = {
  padding: "12px",
  fontSize: "1.1rem",
  color: "#fff",
  backgroundColor: '#946b2b',
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const optionButtonHoverStyle = {
  backgroundColor: "#c0a16b", 
}

const scoreContainerStyle = {
  marginTop: "20px",
  fontSize: "1.1rem",
};

export default GamePlay;
