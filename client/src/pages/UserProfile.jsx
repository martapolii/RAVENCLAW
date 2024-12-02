import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Harry Potter',
    email: 'harry.potter@example.com',
    score: 50,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchedUserInfo = {
      name: 'Harry Potter',
      email: 'harry.potter@example.com',
      score: 50,
    };
    setUserInfo(fetchedUserInfo);
  }, []);

  const profileContainerStyle = {
    backgroundColor: '#f4f4f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
    textAlign: 'center',
  };

  const headerStyle = {
    color: '#0e1a40',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  const userInfoStyle = {
    textAlign: 'left',
    fontSize: '1.2rem',
    marginBottom: '20px',
  };

  const actionsStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1f2a59',
    color: 'white',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d9534f',
    color: 'white',
  };

  const editButtonHoverStyle = {
    backgroundColor: '#0e1a40',
  };

  const logoutButtonHoverStyle = {
    backgroundColor: '#c9302c',
  };

  return (
    <div style={profileContainerStyle}>
      <h2 style={headerStyle}>User Profile</h2>
      <div style={userInfoStyle}>
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Score:</strong> {userInfo.score}
        </p>
      </div>
      <div style={actionsStyle}>
        <button
          style={editButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = editButtonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = editButtonStyle.backgroundColor)}
          onClick={() => navigate('/admin-users')}
        >
          Edit Profile
        </button>
        <button
          style={logoutButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)}
          onClick={() => alert('Logout functionality')}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;