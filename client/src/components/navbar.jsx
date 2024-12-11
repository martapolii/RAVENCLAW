import React from 'react';
import { NavLink } from 'react-router-dom'; // navink styles the active link automatically!!
import '../css/navbar.css';

const Navbar = ({ isAuthenticated, isAdmin }) => {
  return (
    <nav>
      <div>
        {/* logo */}
        <NavLink to="/"> {/* logo links to home page */}
          <img src="/assets/logo.png" alt="logo" />
        </NavLink>
      </div>

      {/* nav bar links */}
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li><NavLink to="/" exact="true" activeClassName="active">Home</NavLink></li>
        
        {!isAuthenticated && ( // these 2 links will only appear to un-authenticated users (not logged in)
          <>
            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
            <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
          </>
        )}
        {isAuthenticated && ( // these 2 links will only appear to authenticated users (logged in)
          <>
            <li><NavLink to="/user-profile" activeClassName="active">My Profile</NavLink></li>
            <li><NavLink to="/game-play" activeClassName="active">Game Play</NavLink></li>
          </>
        )}
        {isAdmin && ( // these 2 links will only appear to users with an admin role
          <>
            <li><NavLink to="/admin-questions" activeClassName="active">Admin Questions</NavLink></li>
            <li><NavLink to="/admin-users" activeClassName="active">Admin Users</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;