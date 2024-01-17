// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UserLoginForm from './components/UserLoginForm';
import RecruiterLoginForm from './components/RecruiterLoginForm';
import GoToTopButton from './components/GoToTopButton';
import ForgotPasswordForm from './components/ForgotPasswordForm';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>        
        <Route path="/" exact element={<Home />} />
        <Route path="/user-login" exact element={<UserLoginForm />} />
        <Route path="/recruiter-login" exact element={<RecruiterLoginForm />} />
        <Route path="/forgot-password" exact element={<ForgotPasswordForm />} />
        {/* Add other routes for user dashboard, recruiter dashboard, etc. */}
      </Routes>
      <GoToTopButton />
    </Router>
  );
};

export default App;
