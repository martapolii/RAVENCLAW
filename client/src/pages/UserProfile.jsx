import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminUsers.css'; // reuse styles for consistency

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    score: 0,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // fetch user data on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          withCredentials: true, // include cookies
        });
        setUserInfo(response.data);
      } catch (err) {
        console.error('error fetching user data:', err);
        setError('Failed to fetch user data.');
      }
    };
    fetchUserInfo();
  }, []);

  // update profile
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`/api/users/${userInfo.id}`, userInfo, {
        withCredentials: true,
      });
      setUserInfo(response.data);
      alert('Profile updated successfully.');
    } catch (err) {
      console.error('error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  // delete account
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`/api/users/${userInfo.id}`, {
          withCredentials: true,
        });
        alert('Account deleted successfully.');
        navigate('/login'); // redirect to login after deletion
      } catch (err) {
        console.error('error deleting account:', err);
        setError('Failed to delete account.');
      }
    }
  };

  // logout user
  const handleLogout = async () => {
    try {
      await axios.post('/api/users/signout', {}, { withCredentials: true });
      alert('Logged out successfully.');
      navigate('/login'); // redirect to login
    } catch (err) {
      console.error('error logging out:', err);
      setError('Failed to logout.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">User Profile</h1>

      {/* error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* profile details */}
      <div className="question-list">
        <h2>Profile Information</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Score:</label>
          <p>{userInfo.score}</p>
        </div>
      </div>

      {/* action buttons */}
      <div className="actions">
        <button className="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
        <button className="button delete-button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;