import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserProfile from './pages/UserProfile';
import GamePlay from './pages/GamePlay';
import AdminQuestions from './pages/AdminQuestions';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/game-play" element={<GamePlay />} />
        <Route path="/admin-questions" element={<AdminQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
