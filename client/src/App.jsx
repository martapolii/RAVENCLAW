import './css/App.css';
import React, { useState, useEffect } from 'react'; // Import state and effect hooks
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './mainRouter'; // MainRouter handles all page-level routing
import { set } from 'lodash';

const App = () => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to track if the user has an admin role
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Simulate fetching user data or decoding token from localStorage
    const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    if (authToken) {
      setIsAuthenticated(true); // User is authenticated
      try {
        // Decode the JWT payload (base64-decoded JSON)
        const user = JSON.parse(atob(authToken.split('.')[1]));
        setIsAuthenticated(true); // User is authenticated
        setIsAdmin(user.role === 'admin'); // Check if the user is an admin

      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false); // Invalidate authentication if decoding fails
        setIsAdmin(false);
      }
    }
  }, []);

const handleLogin = (token, role) => { // **function to handle user login**
  setIsAuthenticated(true); // set the user as authenticated
  setIsAdmin(role === 'admin'); // check if the user is an admin
};

  return (
    <Router>
      {/* Main Router handles navigation between pages */}
      <MainRouter isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogin={handleLogin} /> {/*passing all these functions to main router to implement them*/}
    </Router>
  );
};

export default App;