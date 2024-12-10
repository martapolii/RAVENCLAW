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
        <li><NavLink to="/" exact="true" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
        <li><NavLink to="/user-profile" activeClassName="active">My Profile</NavLink></li>
        <li><NavLink to="/game-play" activeClassName="active">Game Play</NavLink></li>
        <li><NavLink to="/admin-questions" activeClassName="active">Admin Questions</NavLink></li>
        <li><NavLink to="/admin-users" activeClassName="active">Admin Users</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;