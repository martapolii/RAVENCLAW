import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null); // add default state so that empty object is not returned = error
  const [isLoading, setIsLoading] = useState(true); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editValues, setEditValues] = useState({});

  // getting user info from the database
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // using token to get user info (has to be admin account)
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json(); // fetch and parse response
        console.log('Fetched user data:', data); // debug fetched data
        setUserInfo(data);
        setEditValues(data); // update fields for editing
      } catch (error) {
        console.error('Error fetching user information:', error);
      } finally {
        setIsLoading(false); // loading = false after fetch
      }
    };

    fetchUserInfo();
  }, []);

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes to the backend
  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userInfo.id}`, { // save by user ID
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // using token to get user info (has to be admin account)
        },
        body: JSON.stringify(editValues),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      const updatedUser = await response.json();
      setUserInfo(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!'); // Happy path
    } catch (error) { // Sad path
      console.error('Error updating user profile:', error);
      alert('Failed to update profile.');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditValues({ ...userInfo });
    setIsEditing(false);
  };
  
  const errormsg = { // error message style
    color: 'red',
    fontSize: '1.5rem',
    textAlign: 'center',
  };

  if (isLoading) {
    return <p>Loading...</p>; // show this msg while loading
  }

  if (!userInfo) {
    return <p style={errormsg}>No user information available.</p>; //  when user data is unavailable
  }

  // Styles
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

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
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

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1f2a59',
    color: 'white',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d9534f',
    color: 'white',
  };

  return (
    <div style={profileContainerStyle}>
      <h2 style={headerStyle}>View User Accounts</h2>
      {isEditing ? (
        <div>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={editValues.name || ''}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={editValues.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            style={inputStyle}
            type="number"
            name="score"
            value={editValues.score || 0}
            onChange={handleInputChange}
            placeholder="Score"
          />
          <div style={actionsStyle}>
            <button style={saveButtonStyle} onClick={handleSave}>
              Save
            </button>
            <button style={cancelButtonStyle} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
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
          <button
            style={saveButtonStyle}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;