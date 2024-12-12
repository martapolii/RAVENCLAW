import React from 'react';
import { useNavigate } from 'react-router-dom'; // for redirtecting after pressing get started
import '../css/Home.css';

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

  const navigate = useNavigate(); // initializing useNavigate hook 

  return (
    <div style={homeStyles}>
      <h1>Welcome, Ravenclaw! Test Your Knowledge and Prove Your Brilliance!</h1>
      <p>It seems you've been chosen by the Sorting Hat to join the ranks of the wise and the witty. 
        You've arrived at the right place, fellow Ravenclaw. Welcome to the world of Harry Potter Trivia—where only the sharpest minds can claim victory. 
        Are you ready to test your knowledge and prove your brilliance? Let the game begin!</p>
      <button
        className="start-button"
        onClick={() => navigate('/login')} // use useNaviagte hook to redirect to login page
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
