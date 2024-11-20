import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li><Link to="/user-profile">User Profile</Link></li>
        <li><Link to="/game-play">Game Play</Link></li>
        <li><Link to="/admin-questions">Admin Questions</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

