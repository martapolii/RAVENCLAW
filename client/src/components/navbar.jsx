import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Login</Link></li>
        <li><Link to="/register" style={{ color: 'black', textDecoration: 'none' }}>Register</Link></li>
        <li><Link to="/user-profile" style={{ color: 'black', textDecoration: 'none' }}>User Profile</Link></li>
        <li><Link to="/game-play" style={{ color: 'black', textDecoration: 'none' }}>Game Play</Link></li>
        <li><Link to="/admin-questions" style={{ color: 'black', textDecoration: 'none' }}>Admin Questions</Link></li>
        <li><Link to="/admin-users" style={{ color: 'black', textDecoration: 'none' }}>Edit User Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;