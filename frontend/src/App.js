import React from 'react';
// You might not need RegistrationForm.css here anymore if its styles are not global
import './RegistrationForm.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your page components
import LandingPage from './pages/landingPage';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import CompleteProfile from './CompleteProfile';
import CompetitionsList from './CompetitionsPage';
import RegisterPage from "./RegisterPage";
import { AddMember } from './AddMember/AddMember';

function App() {
  return (
    <Router>
      {/* The old <nav> element has been removed */}
      <Routes>
        {/* The root path "/" now renders your new LandingPage */}
        <Route path="/" element={<LandingPage />} />
        
        {/* All your other application routes remain the same */}
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