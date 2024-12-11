import './css/App.css';
import React, { useState, useEffect } from 'react'; // Import state and effect hooks
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './mainRouter'; // MainRouter handles all page-level routing

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
        setIsAdmin(user.role === 'admin'); // Check if the user is an admin
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false); // Invalidate authentication if decoding fails
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <Router>
      {/* Main Router handles navigation between pages */}
      <MainRouter isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
    </Router>
  );
};

export default App;