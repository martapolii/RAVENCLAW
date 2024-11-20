import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/questions" style={{ color: 'black', textDecoration: 'none' }}>Questions</Link></li>
        <li><Link to="/question-details" style={{ color: 'black', textDecoration: 'none' }}>Question Details</Link></li>
        <li><Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Login</Link></li>
        <li><Link to="/register" style={{ color: 'black', textDecoration: 'none' }}>Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;