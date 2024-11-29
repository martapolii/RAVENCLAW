import React, { useState } from 'react';

const GamePlay = () => {
  
  const questions = [
    {
      question: "What is the name of Harry Potter's owl?",
      options: ["Hedwig", "Scabbers", "Crookshanks", "Fawkes"],
      correctAnswer: "Hedwig",
    },
    {
      question: "Which Hogwarts house is known for bravery?",
      options: ["Gryffindor", "Hufflepuff", "Slytherin", "Ravenclaw"],
      correctAnswer: "Gryffindor",
    },
    {
      question: "Who was the Half-Blood Prince?",
      options: ["Harry Potter", "Tom Riddle", "Severus Snape", "Draco Malfoy"],
      correctAnswer: "Severus Snape",
    },
    {
      question: "What is the name of the street where the Weasleys live?",
      options: ["Privet Drive", "Diagon Alley", "The Burrow", "Godric's Hollow"],
      correctAnswer: "The Burrow",
    },
    {
      question: "Which of these is NOT a wizarding school?",
      options: ["Beauxbatons", "Durmstrang", "Ilvermorny", "Bryn Mawr"],
      correctAnswer: "Bryn Mawr",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  
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
      <h2 style={headerStyle}>Harry Potter Trivia</h2>
      <p style={questionStyle}>
        {questions[currentQuestionIndex].question}
      </p>
      <div style={optionsContainerStyle}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              ...optionButtonStyle,
              backgroundColor:
                selectedOption === option
                  ? option === questions[currentQuestionIndex].correctAnswer
                    ? "#4CAF50" 
                    : "#f44336" 
                  : "#946b2b", 
            }}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <button onClick={handleNextQuestion} style={nextButtonStyle}>
          Next Question
        </button>
      )}
      <div style={scoreContainerStyle}>
        <p>Score: {score}</p>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      </div>
    </div>
  );
};

// Inline styles for GamePlay component
const gameplayContainerStyle = {
  backgroundColor: "#f4f4f9", 
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: '20px auto',
  textAlign: "center",
};

const headerStyle = { // Added this to make the color scheme between GamePlay and UserProfile consistent - T
  color: '#0e1a40', 
  fontSize: '2rem',
  marginBottom: '20px',
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
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const nextButtonStyle = {
  padding: "12px 24px",
  fontSize: "1.1rem",
  backgroundColor: "#0e1a40", 
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const scoreContainerStyle = {
  marginTop: "20px",
  fontSize: "1.1rem",
};

export default GamePlay;

