import React from 'react';
import { NavLink } from 'react-router-dom'; // navink styles the active link automatically!!
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div>
        {/* logo */}
        <NavLink to="/">
          <img src="/assets/logo.png" alt="logo" />
        </NavLink>
      </div>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li><NavLink to="/" exact="true" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Home</NavLink></li>
        <li><NavLink to="/login" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Login</NavLink></li>
        <li><NavLink to="/register" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Register</NavLink></li>
        <li><NavLink to="/user-profile" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>User Profile</NavLink></li>
        <li><NavLink to="/game-play" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Game Play</NavLink></li>
        <li><NavLink to="/admin-questions" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Admin Questions</NavLink></li>
        <li><NavLink to="/admin-users" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Edit User Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;