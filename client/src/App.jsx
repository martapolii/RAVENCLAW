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

// having issue where isAuthenticated and isAdmin are not updating dynamically, causing the navbar to not update when user logs in or out

// adding functions to listen to changes actively
const handleLogin = (token, role) => { // **function to handle user login**
  localStorage.setItem('authToken', token); // saving the token explicitly
  setIsAuthenticated(true); // set the user as authenticated
  setIsAdmin(role === 'admin'); // check if the user is an admin
};
// adding logout functionality
const handleLogout = () => {
  localStorage.removeItem('authToken');
  setIsAuthenticated(false);
  setIsAdmin(false);
};

  useEffect(() => {
    // Simulate fetching user data or decoding token from localStorage
    const updateAuthState = () => {
      const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      if (authToken) {
        try {
          // Decode the JWT payload (base64-decoded JSON)
          const user = JSON.parse(atob(authToken.split('.')[1]));
          setIsAuthenticated(true); // User is authenticated
          setIsAdmin(user.role === 'admin'); // Check if the user is an admin
        } 
        catch (error) {
          console.error('Error decoding token:', error);
          setIsAuthenticated(false); // Invalidate authentication if decoding fails
          setIsAdmin(false);
        }
      } 
      else{
        setIsAuthenticated(false); // no token found
        setIsAdmin(false);
      }
    };

      updateAuthState(); // call function to check for auth state changes
      window.addEventListener('storage', updateAuthState); // listen for storage events
      return () => {
        window.removeEventListener('storage', updateAuthState); // remove event listener when component unmounts
      };
  }, []);

  return (
    <Router>
      {/* Main Router handles navigation between pages */}
      {/*passing all these functions to main router to implement them*/}
      <MainRouter  
      isAuthenticated={isAuthenticated} 
      isAdmin={isAdmin} 
      onLogin={handleLogin}
      onLogout={handleLogout}
      /> 
    </Router>
  );
};

export default App;