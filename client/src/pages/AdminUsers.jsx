import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]); // list of users 
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' }); // new user input
  // user being edited: 
  const [editingUser, setEditingUser] = useState(null); 
  const [editValues, setEditValues] = useState({}); 
  const [error, setError] = useState(null);

  // list all users
  const fetchUsers = async () => {
    try { 
      const response = await axios.get('/api/users', {
        withCredentials: true, // send cookies when making requests  
  });
  setUsers(response.data);
    } catch (err) {
      console.error('Eror fetching users:', err);  
      setError('Failed to fetch users.');
    }
  }; 

  useEffect(() => {
    fetchUsers();
  }, []);

  // add new user
  const handleAddUser = async () => {
    try {
  const response = await axios.post('/api/users/register', newUser, {
        withCredentials: true,});
      setUsers([...users, response.data]); // add new user to list
      setNewUser({ username: '', password: '', role: 'user' }); // clear inputs
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user.'); 
    }
  };

  // delete a user
  const handleDeleteUser = async (userId) => {
    try{
      await axios.delete(`/api/users/${userId}`, { 
      withCredentials: true, }); 
      setUsers(users.filter((user) => user._id !== userId)); // remove deleted user
    } catch (err) {  
      console.error('Error deleting the user:', err);
      setError('Failed to delete user.');
    }
  };

// update user  
  const handleUpdateUser = async () => { 
    try {
      const response = await axios.put(`/api/users/${editingUser._id}`, editValues, {
      withCredentials: true,});
      setUsers(users.map((user) => (user._id === editingUser._id ? response.data : user))); // update list
      setEditingUser(null); // exit edit mode
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Admin - Manage Users</h1>

      {/* error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* form to add user */}
      <div className="question-list">
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select className="button"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="button" onClick={handleAddUser}>Add User</button>
      </div>

      {/* list of users */}
      <div className="question-list">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="button" onClick={() => setEditingUser(user) & setEditValues(user)}>Edit</button>
                  <button className="button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editValues.username}
            onChange={(e) => setEditValues({ ...editValues, username: e.target.value })}
          />
          <input
            type="text"
            value={editValues.email}
            onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
          />
          <select
            value={editValues.role}
            onChange={(e) => setEditValues({ ...editValues, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleUpdateUser}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
