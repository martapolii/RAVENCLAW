import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    score: 0,
  });

  const navigate = useNavigate();

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/me'); // Fetch current user's profile
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
      }
    };

    fetchUserInfo();
  }, []);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/users/${userInfo.id}`, userInfo); // Update user data
      setUserInfo(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`/api/users/${userInfo.id}`); // Delete user account
        alert('Account deleted successfully');
        navigate('/login'); // Redirect to login after deletion
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear authentication token and navigate to login
    localStorage.removeItem('authToken');
    alert('Logged out successfully');
    navigate('/login');
  };

  // Styling for profile container
  const profileContainerStyle = {
    backgroundColor: '#f4f4f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
    textAlign: 'center',
  };

  // Styling for headers
  const headerStyle = {
    color: '#0e1a40',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  // Styling for user information
  const userInfoStyle = {
    textAlign: 'left',
    fontSize: '1.2rem',
    marginBottom: '20px',
  };

  // Styling for action buttons
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
          <strong>Name:</strong>{' '}
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
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
          onClick={handleUpdate}
        >
          Update Profile
        </button>
        <button
          style={logoutButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)}
          onClick={handleDelete}
        >
          Delete Account
        </button>
        <button
          style={logoutButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
