import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import QuestionList from './components/QuestionList';

import Login from './pages/login';
import Register from './pages/register';
import UserProfile from './pages/UserProfile';
import GamePlay from './pages/GamePlay';
import AdminQuestions from './pages/AdminQuestions';

const MainRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/game-play" element={<GamePlay />} />
        <Route path="/admin-questions" element={<AdminQuestions />} />
      </Routes>
    </div>
  );
}

export default MainRouter;