// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiChevronDown } from 'react-icons/fi';

// Import all the necessary components and assets
import { ReactComponent as AuthFrame } from '../assets/auth-frame.svg';
import { ReactComponent as TabBarDeco } from '../assets/tab-bar-deco.svg';
import DecoratedInput from '../components/AuthPage/DecoratedInput.js';
import DecoratedButton from '../components/AuthPage/DecoratedButton.js';
import authorPlaceholder from '../assets/author-placeholder.png'; // Using your new placeholder

const BASE_URL = 'http://localhost:8000'; // Your API URL

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    fullname: 'Lorem Ipsum',
    email: 'loremipsum@gmail.com',
    alcherId: '23098756',
    phone: '333-333-3333',
    altPhone: '',
    countryCode: '+91',
    gender: 'Female',
    teamName: 'Golden Triangle',
    college: 'IIT Guwahati', // Corrected spelling
    city: 'Guwahati',
    state: 'Assam',
    profilePic: authorPlaceholder,
    emailVerified: false,
    registeredOn: '1 month ago',
  });
  const [error, setError] = useState('');

  // useEffect to fetch user data on page load
  useEffect(() => { /* ... (Your data fetching logic) ... */ }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => { /* ... (Your data saving logic) ... */ };

  const pageHeader = React.createElement('div', { key: 'header', className: 'mb-8' },
    React.createElement('h1', { className: 'text-4xl font-bold text-white' }, `Welcome, ${userData.fullname}`),
    React.createElement('p', { className: 'text-gray-400' }, `Alcher ID #${userData.alcherId}`)
  );

  const tabs = React.createElement('div', { key: 'tabs', className: 'relative h-20 w-full max-w-[1032px] mx-auto' },
    React.createElement(TabBarDeco, { className: 'absolute inset-0 w-full h-full', preserveAspectRatio: "none" }),
    React.createElement('div', { className: 'relative z-10 flex justify-around items-center h-full text-white' },
      React.createElement('span', { className: 'font-bold text-brand-orange border-b-2 border-brand-orange pb-1' }, 'My Profile'),
      React.createElement('span', { className: 'text-gray-400 hover:text-white cursor-pointer' }, 'My registrations'),
      React.createElement('span', { className: 'text-gray-400 hover:text-white cursor-pointer' }, 'Team Members')
    ),
    React.createElement('img', {
      src: userData.profilePic, alt: 'Profile',
      className: 'absolute top-1/2 -translate-y-1/2 left-[60%] w-16 h-16 rounded-full border-4 border-brand-dark'
    })
  );

  const formHeader = React.createElement('div', { key: 'form-header', className: 'flex items-center gap-x-4' },
    React.createElement('img', { src: userData.profilePic, alt: 'Profile', className: 'w-16 h-16 rounded-full' }),
    React.createElement('div', { className: 'flex-grow' },
      React.createElement('h3', { className: 'text-xl font-bold' }, userData.fullname),
      React.createElement('p', { className: 'text-gray-500 text-sm' }, userData.email)
    ),
    !userData.emailVerified && React.createElement(DecoratedButton, { size: "sm" }, 'Confirm')
  );

  // Custom styled dropdown for the 'Gender' field
  const genderDropdown = React.createElement('div', { key: 'gender-div' },
      React.createElement('label', { htmlFor: 'gender', className: 'block text-xs font-medium text-gray-700 mb-1' }, 'Gender'),
      React.createElement('div', { className: 'relative h-8 group' },
          React.createElement(DecoratedInput, { id: 'gender-base', label: '' }), // Using DecoratedInput for the frame
          React.createElement('select', {
              name: 'gender', id: 'gender', value: userData.gender, onChange: handleChange,
              className: 'absolute inset-0 z-20 appearance-none w-full h-full bg-transparent border-none focus:outline-none px-3 text-sm text-gray-800'
          },
              React.createElement('option', null, 'Female'),
              React.createElement('option', null, 'Male'),
              React.createElement('option', null, 'Other')
          ),
          React.createElement(FiChevronDown, {
              className: 'absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10'
          })
      )
  );

  const formFields = React.createElement('div', { key: 'form-fields', className: 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6' },
    React.createElement(DecoratedInput, { id: 'fullname', label: 'Full Name', value: userData.fullname, onChange: handleChange }),
    React.createElement(DecoratedInput, { id: 'phone', label: 'Phone Number*', value: `${userData.countryCode} ${userData.phone}`, onChange: handleChange }),
    genderDropdown,
    React.createElement(DecoratedInput, { id: 'altPhone', label: 'Alternate Phone Number', value: `${userData.countryCode} ${userData.altPhone}`, onChange: handleChange }),
    React.createElement(DecoratedInput, { id: 'teamName', label: 'Team Name', value: userData.teamName, onChange: handleChange }),
    React.createElement(DecoratedInput, { id: 'college', label: 'College', value: userData.college, onChange: handleChange }),
    React.createElement(DecoratedInput, { id: 'city', label: 'City', value: userData.city, onChange: handleChange }),
    React.createElement(DecoratedInput, { id: 'state', label: 'State', value: userData.state, onChange: handleChange })
  );

  const emailInfo = React.createElement('div', { key: 'email-info', className: 'flex items-center gap-x-3 mt-8 border-t border-gray-300 pt-6' },
    React.createElement(FiMail, { className: 'w-8 h-8 text-brand-red flex-shrink-0' }),
    React.createElement('div', null,
        React.createElement('p', { className: 'text-sm font-semibold' }, 'Email Address'),
        React.createElement('p', { className: 'text-sm text-gray-600' }, userData.email),
        React.createElement('p', { className: 'text-xs text-gray-400' }, `Joined ${userData.registeredOn}`)
    )
  );

  return (
    React.createElement('div', { style: { backgroundImage: `url(${require('../assets/background-pattern.svg').default})` }, className: 'min-h-screen bg-brand-dark p-4 sm:p-8' },
      React.createElement('main', { className: 'w-full max-w-6xl mx-auto' },
        pageHeader,
        tabs,
        
        // This is the responsive container using the auth-frame
        React.createElement('div', { className: 'relative w-full aspect-[1032/671] mt-[-2.5rem]' },
          // The frame is the bottom layer
          React.createElement(AuthFrame, {
            className: 'absolute inset-0 w-full h-full text-brand-beige z-0',
            preserveAspectRatio: "none"
          }),
          // The content is layered on top with padding
          React.createElement('div', { className: 'relative z-10 p-10 h-full overflow-y-auto' },
            formHeader,
            React.createElement('hr', { className: 'my-6 border-gray-300' }),
            React.createElement('form', { onSubmit: handleSubmit },
              formFields,
              emailInfo
            )
          )
        )
      )
    )
  );
};

export default ProfilePage;