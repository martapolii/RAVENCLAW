import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import QuestionList from './components/QuestionList';
import QuestionDetails from './components/QuestionDetails';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/question-details" element={<QuestionDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;