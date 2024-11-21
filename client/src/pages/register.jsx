import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // We need to add registeration logic here - deliverable 3 likely will have this
    alert('Registration successful!');
  };

  const pageStyles = {
    textAlign: 'center',
    margin: '20px',
    backgroundColor: '#0e1a40', // Ravenclaw blue
    color: '#946b2b', // White text color
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    fontFamily: "'Georgia', serif", 
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1f2a59', // Slightly darker blue for form background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    width: '300px',
    margin: '0 auto',
  };

  const inputStyles = {
    padding: '10px',
    margin: '10px',
    width: '250px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1em',
    color: '#1f2a59', // Adjusted text color to match dark blue theme
    backgroundColor: '#c0c0c0', // Silver background for input fields
  };

  const buttonStyles = {
    backgroundColor: '#ffffff', // White button
    color: '#946b2b', // Dark gold text color
    padding: '15px 30px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  const buttonHoverStyles = {
    backgroundColor: '#1f2a59', // Dark blue background on hover
    color: '#c0c0c0', // Silver text on hover
  };

  return (
    <div style={pageStyles}>
      <h1>Create Your Account</h1>
      <p>Join the ranks of Ravenclaw and unlock your path to knowledge!</p>

      <form style={formStyles} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyles}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyles}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyles}
        />
        <button
          type="submit"
          style={buttonStyles}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyles.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyles.backgroundColor}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
