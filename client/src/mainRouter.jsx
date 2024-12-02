import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import GamePlay from './pages/GamePlay';
import AdminQuestions from './pages/AdminQuestions';
import AdminUsers from './pages/AdminUsers';

const MainRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/game-play" element={<GamePlay />} />
        <Route path="/admin-questions" element={<AdminQuestions />} />
        <Route path="/admin-users" element={<AdminUsers />} />
      </Routes>
    </div>
  );
};

export default MainRouter;