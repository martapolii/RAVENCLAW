import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Harry Potter',
    email: 'harry.potter@example.com',
    score: 50,
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editValues, setEditValues] = useState({ ...userInfo }); // Editable fields

  useEffect(() => {
    const fetchedUserInfo = {
      name: 'Harry Potter',
      email: 'harry.potter@example.com',
      score: 50,
    };
    setUserInfo(fetchedUserInfo);
  }, []);

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes
  const handleSave = () => {
    setUserInfo(editValues);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Cancel editing
  const handleCancel = () => {
    setEditValues({ ...userInfo });
    setIsEditing(false);
  };

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
      <h2 style={headerStyle}>Edit User Profile</h2>
      {isEditing ? (
        <div>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={editValues.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={editValues.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            style={inputStyle}
            type="number"
            name="score"
            value={editValues.score}
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