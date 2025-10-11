//import React from 'react';
// You might not need RegistrationForm.css here anymore if its styles are not global
import './RegistrationForm.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";

// Import all your page components
import LandingPage from './pages/landingPage';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import CompleteProfile from './CompleteProfile';
import CompetitionsList from './CompetitionsPage';
import RegisterPage from "./RegisterPage";
import { AddMember } from './components/AddMember';
import Err404Page from "./pages/err404Page";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  //const token = localStorage.getItem("access"); // check login
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (API init, user check, etc.)
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

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
        <Route path="*" element={<Err404Page />} />

      </Routes>
    </Router>
  );
}

export default App;