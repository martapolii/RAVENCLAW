import React, { useState } from 'react';
import axios from 'axios'; // For making API requests
import '../css/Home.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages
  const [isError, setIsError] = useState(false); // To style messages accordingly

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh on form submission

    // Client-side validation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!'); // Error message
      setIsError(true);
      return;
    }

    try {
      // API request to register the user
      const response = await axios.post('/api/users/register', {
        email,
        password,
      });

      // If successful, set success message and clear form fields
      setMessage('Registration successful! Welcome to Ravenclaw.');
      setIsError(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Handle errors returned from the server
      setMessage(error.response?.data?.message || 'Registration failed. Try again.');
      setIsError(true);
    }
  };

  // Styling for the registration page container
  const pageStyles = {
    textAlign: 'center',
    backgroundColor: '#0e1a40', // Ravenclaw blue
    color: '#946b2b', // White text color
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    fontFamily: "'Georgia', serif",
    margin: '20px auto', // Ensures same margin as each page 
    maxWidth: '800px', // Limits the width to match each page
  };

  // Styling for the form
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

  // Styling for input fields
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

  // Styling for success or error messages
  const messageStyles = {
    color: isError ? '#ff4d4d' : '#4caf50', // Red for errors, green for success
    fontSize: '1.1em',
    marginTop: '20px',
  };

  return (
    <div style={pageStyles}>
      <h1>Create Your Account</h1>
      <p>Join the ranks of Ravenclaw and unlock your path to knowledge!</p>

      {/* Form for user registration */}
      <form style={formStyles} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyles}
          required // Ensures the field is not left empty
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyles}
          required // Ensures the field is not left empty
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyles}
          required // Ensures the field is not left empty
        />
        <button
          type="submit"
          className="start-button"
        >
          Register
        </button>
      </form>

      {/* Message section for feedback */}
      {message && <p style={messageStyles}>{message}</p>}
    </div>
  );
};

export default Register;