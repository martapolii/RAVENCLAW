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
  setIsAuthenticated(true); // set the user as authenticated
  setIsAdmin(role === 'admin'); // check if the user is an admin
};
// adding logout functionality
  setIsAuthenticated(false);
  setIsAdmin(false);
};

useEffect(() => {
  // replace with a function to check authentication state based on the presence of the cookie (making this consistent with the backend)
  const updateAuthState = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
        credentials: 'include', // cookies are sent with the request
      });

      if (response.ok) {
        const user = await response.json();
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error fetching user state:', error);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  updateAuthState(); // call the function to check the authentication state
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