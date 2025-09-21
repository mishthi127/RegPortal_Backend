import React from 'react';
import './RegistrationForm.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import Profile from './Profile';
import CompleteProfile from './CompleteProfile';
import CompetitionsList from './CompetitionsPage';
import RegisterPage from "./RegisterPage";
import { AddMember } from './AddMember/AddMember';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/profile" style={{ marginRight: '1rem' }}>My Profile</Link>
        <Link to="/competitions" style={{ marginRight: '1rem' }}>Competitions</Link>
        <Link to="/addmember">addmember</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/competitions" element={<CompetitionsList />} />
        <Route path="/register/:id" element={<RegisterPage />} />
        <Route path="/addmember" element={<AddMember />} />
      </Routes>
    </Router>
  );
}

export default App;
