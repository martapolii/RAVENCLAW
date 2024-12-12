import React from 'react';
import { useNavigate } from 'react-router-dom'; // for redirtecting after pressing get started

const Home = () => {
  const homeStyles = {
    textAlign: 'center',
    //margin: '20px',
    backgroundColor: '#0e1a40', // Ravenclaw blue
    color: '#946b2b', // White text color
    padding: '40px',
    borderRadius: '10px',
    margin: '20px auto', // Ensures same margin as each page
    maxWidth: '800px', // Limits the width to match the Register page
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    fontFamily: "'Georgia', serif", 
  };

  const buttonStyles = {
    backgroundColor: '#white',
    color: '#0e1a40', // Ravenclaw blue
    padding: '15px 30px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    textDecoration: 'none',
  };

  const buttonHoverStyles = {
    backgroundColor: '#1f2a59', // Dark blue background on hover
    color: '#c0c0c0', // Silver text on hover
  };

  const navigate = useNavigate(); // initializing useNavigate hook 

  return (
    <div style={homeStyles}>
      <h1>Welcome, Ravenclaw! Test Your Knowledge and Prove Your Brilliance!</h1>
      <p>It seems you've been chosen by the Sorting Hat to join the ranks of the wise and the witty. 
        You've arrived at the right place, fellow Ravenclaw. Welcome to the world of Harry Potter Trivia—where only the sharpest minds can claim victory. 
        Are you ready to test your knowledge and prove your brilliance? Let the game begin!</p>
      <button
        style={buttonStyles}
        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyles.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyles.backgroundColor}
        onClick={() => navigate('/login')} // use useNaviagte hook to redirect to login page
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
