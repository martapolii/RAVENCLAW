import './css/App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import MainRouter from './mainRouter'; // MainRouter handles all page-level routing

// Main App Component
const App = () => {
  return (
    <Router>
      {/* Main Router handles navigation between pages */}
      <MainRouter />
    </Router>
  );
};

export default App;