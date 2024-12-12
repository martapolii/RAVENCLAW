import React, { useState } from 'react';
import axios from 'axios'; // For making API requests
import { useNavigate } from 'react-router-dom'; // for redirtecting after login 
import '../css/buttons.css';

const Login = ({onLogin}) => { // **had error where login was not being detected by app.jsx, so adding a prop for this function**
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // added backend-frontend integration
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // initializing useNavigate hook 

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    //  POST request to the backend login api endpoiint
    const response = await axios.post('/api/users/login', {email, password,});

    if (response.status !== 200) { //error if invalid password/email
      throw new Error('Invalid credentials');
    }
 
    const { token, role } = response.data; // axios response data
    localStorage.setItem('authToken', token); // save token

    onLogin(token, role); // **notify App.jsx about the user login**

    // redirect user after login
    navigate('/user-profile'); // use useNaviagte hook to redirect to user profile page
    
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

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
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
          className="base-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      </div>
  );
};

export default Login;
