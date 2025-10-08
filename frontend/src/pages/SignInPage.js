// src/pages/SignInPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../components/AuthPage/AuthLayout.js';
import DecoratedInput from '../components/AuthPage/DecoratedInput.js';
import DecoratedPasswordInput from '../components/AuthPage/DecoratedPasswordInput.js';
import DecoratedButton from '../components/AuthPage/DecoratedButton.js';

const BASE_URL = 'http://localhost:8000';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${BASE_URL}/login/`, { email, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      window.location.href = '/profile';
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    }
  };
  const handleGoogleSuccess = async credentialResponse => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post(`${BASE_URL}/api/auth/google/`, { token });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      if (res.data.needs_completion) {
        window.location.href = '/complete-profile';
      } else {
        window.location.href = '/profile';
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Google login failed.');
    }
  };

  const formContent = [
    React.createElement(DecoratedInput, { key: 'email', id: "email", label: "Email ID", type: "email", placeholder: "Enter your email", value: email, onChange: e => setEmail(e.target.value), required: true }),
    React.createElement(DecoratedPasswordInput, { key: 'password', id: "password", label: "Password", placeholder: "Enter your Password", value: password, onChange: e => setPassword(e.target.value), required: true }),
    error && React.createElement('p', { key: 'error', className: "text-sm text-brand-red text-center" }, error),
    React.createElement('div', { key: 'forgot-link', className: 'text-right' }, 
      React.createElement('a', {href: '/forgot-password', className: 'text-sm text-dark-orange hover:underline'}, 'Forgot password?')
    ),
    React.createElement('div', { key: 'submit-wrapper', className: 'flex justify-end pt-4' },
      React.createElement(DecoratedButton, { type: 'submit' }, "Sign In")
    )
  ];

  return (
    React.createElement(AuthLayout, { promoTitle: "WELCOME BACK!", promoSubtitle: "Sign in to continue your journey with us" },
      React.createElement('h2', { className: "font-display text-3xl font-bold text-gray-800" }, "SIGN IN"),
      React.createElement('p', { className: "text-brand-gray mt-2" }, "If you don't have an account? ", React.createElement('a', { href: "/register", className: "text-dark-orange font-semibold" }, "Sign up")),
      React.createElement('form', { className: "mt-8 space-y-4", onSubmit: handleSubmit }, formContent),
      React.createElement('div', { key: 'divider', className: 'my-6 flex items-center' },
        React.createElement('div', { className: 'flex-grow border-t border-gray-300' }),
        React.createElement('span', { className: 'mx-4 text-gray-500 text-sm' }, 'Or'),
        React.createElement('div', { className: 'flex-grow border-t border-gray-300' })
      ),
      React.createElement('div', { key: 'google-btn', className: 'flex justify-center' },
        React.createElement(GoogleLogin, { onSuccess: handleGoogleSuccess, onError: () => setError('Google login failed') })
      )
    )
  );
};
export default SignInPage;