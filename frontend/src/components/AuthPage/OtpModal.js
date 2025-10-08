// src/components/AuthPage/OtpModal.js
import React, { useState, useRef } from 'react'; // 1. Imported useRef
import axios from 'axios';
import DecoratedButton from './DecoratedButton'; // We can use the standard button again
import { FiX } from 'react-icons/fi';

import { ReactComponent as AuthFrame } from '../../assets/auth-frame.svg';
import { ReactComponent as OtpDeco } from '../../assets/otp-deco.svg';
import { ReactComponent as InputDeco } from '../../assets/otp-input-deco.svg';

const BASE_URL = 'http://localhost:8000';

const OtpModal = ({ onClose, onVerifySuccess, contactInfo, email }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  // 2. Created a ref for the INPUT field
  const otpInputRef = useRef(null);

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

  // 3. Created a new handler with the 'blur' logic
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtp(value);
    // When 4 digits are entered, blur the input to remove the cursor
    if (value.length === 4 && otpInputRef.current) {
      otpInputRef.current.blur();
    }
  };

  const otpInput = React.createElement('div', { className: "relative h-10 w-32 group" }, 
    React.createElement(InputDeco, { 
      className: "absolute top-0 left-0 w-full h-full text-dark-orange pointer-events-none",
      preserveAspectRatio: "none" 
    }),
    React.createElement('input', {
      ref: otpInputRef, // 4. Attached the ref to the input
      id: 'otp',
      name: 'otp',
      type: 'text',
      maxLength: 4,
      value: otp,
      onChange: handleOtpChange, // 5. Used the new handler here
      className: "relative z-10 w-full h-full bg-transparent border-none focus:outline-none text-center text-xl tracking-[0.8em] font-bold text-gray-800 indent-[0.8em]"
    })
  );

  return (
    React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4' },
      React.createElement('div', { className: 'relative max-w-[489px] w-full aspect-[489/336] font-body' },
        React.createElement(AuthFrame, {
            className: 'absolute inset-0 w-full h-full text-brand-beige z-0',
            preserveAspectRatio: "none"
        }),
        React.createElement('div', { className: 'relative z-10 w-full h-full' },
          React.createElement('button', { onClick: onClose, className: 'absolute top-[28px] right-[47px] text-2xl text-gray-500 hover:text-gray-800 z-50' }, React.createElement(FiX, null)),
          React.createElement('div', { className: 'absolute top-[20px] w-full flex justify-center' },
            React.createElement(OtpDeco, null)
          ),
          React.createElement('div', { className: 'absolute top-[98px] left-[40px] right-[40px] flex flex-col items-center text-center gap-y-2' },
            React.createElement('h2', { className: 'font-display text-2xl font-bold text-gray-800' }, 'OTP VERIFICATION'),
            React.createElement('p', { className: 'text-brand-gray text-sm' }, 
              'OTP sent to ',
              React.createElement('span', { className: 'font-semibold text-dark-orange' }, contactInfo || '91-898989898')
            ),
            React.createElement('p', { className: 'text-brand-gray text-sm' }, 
              'Send to email instead? ',
              React.createElement('button', { className: 'font-semibold text-dark-orange hover:underline' }, 'Send via email')
            )
          ),
          React.createElement('div', { className: 'absolute top-[214px] left-[20px] right-[20px] ' },
            React.createElement('form', { onSubmit: handleOtpSubmit, className: 'w-full flex items-center justify-center gap-x-20' },
              otpInput,
              // We can now go back to using the simple DecoratedButton
              React.createElement(DecoratedButton, { type: 'submit', size: "md" }, 'Verify')
            ),
            error && React.createElement('p', { className: 'text-xs text-brand-red text-center mt-2' }, error)
          ),
          React.createElement('button', { className: 'absolute bottom-[30px] w-full text-sm text-dark-orange hover:underline text-center' }, 'Send again?')
        )
      )
    )
  );
};

export default OtpModal;