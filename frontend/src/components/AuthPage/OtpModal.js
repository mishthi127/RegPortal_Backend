// src/components/AuthPage/OtpModal.js
import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import axios from 'axios';
import DecoratedButton from './DecoratedButton';
import { FiX } from 'react-icons/fi';

import { ReactComponent as AuthFrame } from '../../assets/auth-frame.svg';
import { ReactComponent as OtpDeco } from '../../assets/otp-deco.svg';
import { ReactComponent as InputDeco } from '../../assets/otp-input-deco.svg';

const BASE_URL = 'http://localhost:8000';

// --- NEW PROP: onResend ---
const OtpModal = ({ onClose, onVerifySuccess, email, onResend }) => { 
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const otpInputRef = useRef(null);
  
  // --- NEW: Cooldown timer state ---
  const [cooldown, setCooldown] = useState(0);

  // --- NEW: useEffect to manage the countdown ---
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${BASE_URL}/verify-otp/`, { email, otp });
      onVerifySuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'OTP verification failed.');
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtp(value);
  };
  
  // --- NEW: Handler for the resend button ---
  const handleResendClick = () => {
    if (cooldown === 0) {
      onResend(); // Call the function passed from TeamInfoPage
      setCooldown(60); // Start a 60-second cooldown
    }
  };

  const otpInput = React.createElement('div', { className: "relative h-10 group" }, 
    React.createElement(InputDeco, { 
      className: "absolute top-0 left-0 w-full h-full text-dark-orange pointer-events-none",
      preserveAspectRatio: "none" 
    }),
    React.createElement('input', {
      ref: otpInputRef,
      id: 'otp',
      name: 'otp',
      type: 'tel',
      value: otp,
      onChange: handleOtpChange,
      className: "relative z-10 w-full h-full bg-transparent border-none focus:outline-none text-center text-lg tracking-[0.4em] font-bold text-gray-800 indent-[0.4em]"
    })
  );

  return (
    React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4' },
      React.createElement('div', { className: 'relative max-w-sm w-full font-body' },
        React.createElement(AuthFrame, {
            className: 'absolute inset-0 w-full h-full text-brand-beige z-0',
            preserveAspectRatio: "none"
        }),
        React.createElement('div', { className: 'relative z-10 p-8 flex flex-col items-center text-center' },
          React.createElement('button', { onClick: onClose, className: 'absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800' }, React.createElement(FiX, null)),
          React.createElement(OtpDeco, { key: 'deco-icon' }),
          React.createElement('h2', { key: 'title', className: 'font-display text-2xl font-bold text-gray-800 mt-3' }, 'OTP VERIFICATION'),
          React.createElement('p', { key: 'subtitle1', className: 'text-brand-gray text-sm mt-3' }, 'An OTP has been sent to ', React.createElement('span', { className: 'font-semibold text-dark-orange' }, email)),
          React.createElement('form', { onSubmit: handleOtpSubmit, className: 'w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-6' },
            otpInput,
            React.createElement(DecoratedButton, { type: 'submit' }, 'Verify')
          ),
          error && React.createElement('p', { key: 'error', className: 'text-xs text-brand-red text-center mt-2' }, error),
          
          // --- MODIFIED: "Send again" button is now functional with cooldown ---
          React.createElement('button', { 
            key: 'send-again', 
            className: 'text-sm text-dark-orange hover:underline mt-6 disabled:text-gray-500 disabled:no-underline',
            onClick: handleResendClick,
            disabled: cooldown > 0
          }, cooldown > 0 ? `Send again in ${cooldown}s` : 'Send again?')
        )
      )
    )
  );
};

export default OtpModal;