import React from 'react';
import { NavLink } from 'react-router-dom'; // navink styles the active link automatically!!
import '../css/navbar.css';

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
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
        <li><NavLink to="/" exact="true" className={({ isActive }) => (isActive ? 'active' : undefined)}>Home</NavLink></li> {/*activeClassName is deprecated*/}
        
        {!isAuthenticated && ( // these 2 links will only appear to un-authenticated users (not logged in)
          <>
            <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : undefined)}>Login</NavLink></li>
            <li><NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : undefined)}>Register</NavLink></li>
          </>
        )}
        {isAdmin && ( // these 2 links will only appear to users with an admin role
          <>
            <li><NavLink to="/admin-questions" className={({ isActive }) => (isActive ? 'active' : undefined)}>Admin Questions</NavLink></li>
            <li><NavLink to="/admin-users" className={({ isActive }) => (isActive ? 'active' : undefined)}>Admin Users</NavLink></li>
          </>
        )}
        {isAuthenticated && ( // these 2 links will only appear to authenticated users (logged in)
          <>
            <li><NavLink to="/user-profile" className={({ isActive }) => (isActive ? 'active' : undefined)}>My Profile</NavLink></li>
            <li><NavLink to="/game-play" className={({ isActive }) => (isActive ? 'active' : undefined)}>Game Play</NavLink></li>
            <li><button onClick={onLogout} style={{background: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;