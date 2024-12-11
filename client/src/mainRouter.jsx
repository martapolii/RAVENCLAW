import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import UserProfile from './pages/UserProfile';
import GamePlay from './pages/GamePlay';
import AdminQuestions from './pages/AdminQuestions';
import AdminUsers from './pages/AdminUsers';
import ProtectedRoute from './components/protected-route'; // Custom route protection
import AdminRoute from './components/admin-route'; // Admin-only route protection

const MainRouter = ({ isAuthenticated, isAdmin, onLogin, onLogout }) => { {/* add onLogin */}
  return (
    <div>
      {/* Navbar displayed on all pages */}
      <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={onLogout} />
      
      {/* Routes for navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} /> {/*passing onLogin function to login page*/}
        
        
        {/* Protected route for authenticated users */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/game-play" element={<GamePlay />} />

        {/* Admin-only routes */}
        <Route
          path="/admin-questions"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminQuestions />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* Redirect for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default MainRouter;