import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // added backend-frontend integration
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    // backend URL from env
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //  POST request to the backend login api endpoiint
    const response = await fetch(`${backendUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), 
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token); // save token

    // redirect user after login
    window.location.href = '/user-profile';
  } catch (error) {
    setError('Login failed. Please check your email and password.');
    console.error('Error during login:', error);
  } finally {
    setIsLoading(false); 
  }
};

  const pageStyles = {
    backgroundColor: '#0e1a40', // Ravenclaw blue
    color: '#946b2b',
    fontFamily: "'Georgia', serif", 
    textAlign: 'center',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    margin: '20px auto', // Ensures same margin as Register page
    maxWidth: '800px', // Limits the width to match the Register page
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1f2a59', // darker blue for form background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    width: '300px',
    margin: '0 auto'
  };

  const inputStyles = {
    padding: '10px',
    margin: '10px',
    width: '250px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1em',
    color: '#1f2a59', 
    backgroundColor: '#c0c0c0', // Silver background for input fields
  };

  const buttonStyles = {
    backgroundColor: '#ffffff', // Silver button
    color: '#0e1a40', // Dark blue text
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
      <h1>Ravenclaw Login</h1>
      <p>Welcome back, fellow Ravenclaw. Enter your credentials to begin!</p>

      {error && <p style={errorStyle}>{error}</p>}

      <form style={formStyles} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyles}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyles}
          required
        />
        <button
          type="submit"
          style={buttonStyles}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = buttonHoverStyles.backgroundColor;
            e.target.style.color = buttonHoverStyles.color;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = buttonStyles.backgroundColor;
            e.target.style.color = buttonStyles.color;
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      </div>
  );
};

export default Login;
