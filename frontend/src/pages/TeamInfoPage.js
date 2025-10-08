// src/pages/TeamInfoPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../components/AuthPage/RegistrationContext.js';
import axios from 'axios';
import AuthLayout from '../components/AuthPage/AuthLayout.js';
import DecoratedInput from '../components/AuthPage/DecoratedInput.js';
import DecoratedButton from '../components/AuthPage/DecoratedButton.js';
import Stepper from '../components/AuthPage/Stepper.js';
import OtpModal from '../components/AuthPage/OtpModal.js';

const BASE_URL = 'http://localhost:8000';

const TeamInfoPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useRegistration();
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = e => {
    updateFormData({ [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { confirm_password, ...requestData } = { ...formData, phone_number: formData.country_code + formData.phone_number, alternate_phone: formData.alternate_phone ? formData.country_code + formData.alternate_phone : '', };
      await axios.post(`${BASE_URL}/register/`, requestData);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
  };

  const onOtpSuccess = () => {
    setIsModalOpen(false);
    navigate('/signin');
  };

  const buttonContainer = React.createElement('div', { key: 'submit-wrapper', className: 'flex justify-between items-center pt-4' },
    React.createElement(DecoratedButton, { 
        type: 'button', 
        onClick: () => navigate(-1)
    }, 'Back'),
    React.createElement(DecoratedButton, { 
        type: 'submit' 
    }, 'Create Account')
  );

  const formFields = [
      React.createElement(DecoratedInput, { key: 'teamName', id: "teamName", label: "Team Name", placeholder: "Team name (Your name/solo)", value: formData.teamName, onChange: handleChange, required: true }),
      React.createElement(DecoratedInput, { key: 'collegename', id: "collegename", label: "College Name", placeholder: "Enter your college name", value: formData.collegename, onChange: handleChange, required: true }),
      React.createElement(DecoratedInput, { key: 'city', id: "city", label: "College City", placeholder: "Enter your college city", value: formData.city, onChange: handleChange, required: true }),
      React.createElement(DecoratedInput, { key: 'state', id: "state", label: "College State", placeholder: "Enter your college state", value: formData.state, onChange: handleChange, required: true }),
      React.createElement('p', { key: 'mandatory', className: 'text-xs text-brand-red -mt-2' }, '*All fields are mandatory'),
      error && React.createElement('p', { key: 'error', className: "text-sm text-brand-red text-center mt-2" }, error),
      buttonContainer
  ];

  const testModalButton = React.createElement('button', {
    key: 'test-modal',
    type: 'button',
    onClick: () => setIsModalOpen(true),
    className: 'absolute top-0 right-0 m-4 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded z-20'
  }, 'Test OTP Modal');

  return (
    React.createElement(AuthLayout, null,
      isModalOpen && React.createElement(OtpModal, {
        onClose: () => setIsModalOpen(false),
        onVerifySuccess: onOtpSuccess,
        contactInfo: '91-898989898', // The phone number to display (using your test number)
        email: formData.email // The email to send to the backend for verification
        }),
      
      React.createElement('div', { className: 'relative' },
        testModalButton, 
        React.createElement('h2', { className: "font-display text-2xl font-bold text-gray-800" }, "CREATE NEW ACCOUNT."),
        React.createElement('p', { className: "text-brand-gray mt-1 text-xs" }, "Already a member? ", React.createElement('a', { href: "/signin", className: "text-dark-orange font-semibold" }, "Sign in")),
        React.createElement(Stepper, { currentStep: 2 }),
        React.createElement('form', { className: "mt-4 space-y-4", onSubmit: handleRegister }, formFields)
      )
    )
  );
};

export default TeamInfoPage;