import React from 'react';
import './RegistrationForm.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm'; // (See below for a sample login form)
import HomePage from './HomePage';
import { AddMember } from './AddMember/AddMember';

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#fafaff", marginBottom: "2rem" }}>
        <Link to="/" style={{ marginRight: "1.5rem" }}>Home</Link>
        <Link to="/register" style={{ marginRight: "1.5rem" }}>Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/addmember">addmember</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/addmember" element={<AddMember />} />
      </Routes>
    </Router>
  );
}

export default App;
