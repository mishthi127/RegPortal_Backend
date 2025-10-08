// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import the context provider
import { RegistrationProvider } from './components/AuthPage/RegistrationContext.js';

// --- Your Existing Page Imports ---
import LandingPage from './pages/landingPage';
import { default as ProfilePage } from './pages/ProfilePage';
import CompleteProfile from './CompleteProfile';
import CompetitionsList from './CompetitionsPage';
import RegisterPage from "./RegisterPage";
import { AddMember } from './AddMember/AddMember';
import SignInPage from './pages/SignInPage.js';
import PersonalInfoPage from './pages/PersonalInfoPage.js';
import TeamInfoPage from './pages/TeamInfoPage.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

function App() {
  const token = localStorage.getItem("access");

  const routeElements = [
    // --- TEMPORARY CHANGE ---
    // The root path "/" now renders your ProfilePage for easy UI checking.
    // Change this back to LandingPage when you are done.
    React.createElement(Route, { key: "landing", path: "/", element: React.createElement(ProfilePage) }),
    
    // The original profile route is still here
    React.createElement(Route, { key: "profile", path: "/profile", element: React.createElement(ProfilePage) }),
    
    React.createElement(Route, { key: "complete-profile", path: "/complete-profile", element: React.createElement(CompleteProfile) }),
    React.createElement(Route, { key: "competitions", path: "/competitions", element: React.createElement(CompetitionsList) }),
    React.createElement(Route, { key: "register-id", path: "/register/:id", element: React.createElement(RegisterPage) }),
    React.createElement(Route, { key: "add-member", path: "/addmember", element: React.createElement(AddMember) }),
    React.createElement(Route, { key: "signin", path: "/signin", element: React.createElement(SignInPage) }),
    React.createElement(Route, { key: "login-compat", path: "/login", element: React.createElement(SignInPage) }),
    React.createElement(Route, { key: "register-personal", path: "/register", element: React.createElement(PersonalInfoPage) }),
    React.createElement(Route, { key: "register-team", path: "/register/team-info", element: React.createElement(TeamInfoPage) }),
    React.createElement(Route, { key: "forgot-password", path: "/forgot-password", element: React.createElement(ForgotPasswordPage) }),
    React.createElement(Route, { key: "not-found", path: "*", element: React.createElement(NotFoundPage) })
  ];

  return (
    React.createElement(RegistrationProvider, null,
      React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
          routeElements
        )
      )
    )
  );
}

export default App;