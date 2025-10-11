// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../components/AuthPage/AuthLayout.js';
import DecoratedPasswordInput from '../components/AuthPage/DecoratedPasswordInput.js';
import DecoratedButton from '../components/AuthPage/DecoratedButton.js';

const BASE_URL = 'http://localhost:8000';

const ForgotPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
        try {
            // --- TODO: Connect Your Backend API Here ---
            // await axios.post(`${BASE_URL}/reset-password`, { password });
            console.log('Password reset logic goes here.');
            setSuccess('Your password has been reset successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to reset password. Please try again.');
        }
    };
    
    const formFields = [
        React.createElement(DecoratedPasswordInput, { key: 'password', id: "password", label: "Set New Password", placeholder: "Create a new password", value: password, onChange: e => setPassword(e.target.value), required: true }),
        React.createElement(DecoratedPasswordInput, { key: 'confirmPassword', id: "confirmPassword", label: "Confirm New Password", placeholder: "Re-enter new password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), required: true }),
        error && React.createElement('p', { key: 'error', className: 'text-sm text-brand-red text-center' }, error),
        success && React.createElement('p', { key: 'success', className: 'text-sm text-green-600 text-center' }, success),
        React.createElement('div', { key: 'submit-wrapper', className: 'flex justify-end pt-4' },
          React.createElement(DecoratedButton, { type: 'submit' }, 'Reset')
        )
    ];

    return (
        React.createElement(AuthLayout, { promoTitle: "RESET YOUR PASSWORD", promoSubtitle: "No worries, we've got you covered" },
            React.createElement('h2', { className: 'font-display text-3xl font-bold text-gray-800' }, 'FORGOT PASSWORD'),
            React.createElement('p', { className: 'text-brand-gray mt-2' }, "Enter your new password below to reset it."),
            React.createElement('form', { className: 'mt-8 space-y-4', onSubmit: handleSubmit }, formFields)
        )
    );
};
export default ForgotPasswordPage;