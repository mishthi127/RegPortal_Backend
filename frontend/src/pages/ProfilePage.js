// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiChevronDown } from 'react-icons/fi';

// Import all necessary components and assets
import { ReactComponent as AuthFrame } from '../assets/auth-frame.svg';
import { ReactComponent as TabBarDeco } from '../assets/nav-item-deco.svg';
import DecoratedInput from '../components/AuthPage/DecoratedInput.js';
import DecoratedButton from '../components/AuthPage/DecoratedButton.js';
import authorPlaceholder from '../assets/author-placeholder.png';
import { AddMembers } from '../components/AddMembers.js';

const BASE_URL = 'http://localhost:8000';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Profile');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      setError('You are not logged in. Redirecting...');
      setIsLoading(false);
      setTimeout(() => navigate('/signin'), 2000);
      return;
    }
    axios.get(`${BASE_URL}/profile/`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUserData({
            profilePic: authorPlaceholder,
            registeredOn: '1 month ago',
            ...res.data,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile. Please log in again.');
        setIsLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/signin';
  };
  const handleChange = (e) => { setUserData({ ...userData, [e.target.name]: e.target.value }); };
  const handleSubmit = async (e) => { e.preventDefault(); /* Your data saving logic */ };

  const tabs = ['Profile', 'My registration', 'Team members'];

  if (isLoading) {
    return React.createElement('div', { className: 'min-h-screen bg-brand-dark text-white flex items-center justify-center' }, 'Loading profile...');
  }
  if (error) {
    return React.createElement('div', { className: 'min-h-screen bg-brand-dark text-white flex items-center justify-center' }, error);
  }
  if (!userData) return null;

  return (
    React.createElement('div', { style: { backgroundImage: `url(${require('../assets/background-pattern.svg').default})` }, className: 'min-h-screen bg-brand-dark p-4 sm:p-8' },
      React.createElement('main', { className: 'w-full max-w-5xl mx-auto' },

        React.createElement('div', { className: 'mb-8 flex justify-between items-center' },
          React.createElement('div', null,
            // FIX: Added responsive text size for the welcome header
            React.createElement('h1', { className: 'text-3xl sm:text-4xl font-bold text-white' }, `Welcome, ${userData.fullname}`),
            React.createElement('p', { className: 'text-gray-400' }, `Alcher ID #${userData.alcherid}`)
          ),
        ),
        
        // --- FIX 1: TAB BAR RESPONSIVENESS ---
        // Changed h-20 to responsive h-16 sm:h-20 and mb-20 to responsive mb-12 sm:mb-20
        React.createElement('div', { className: 'relative w-full max-w-[1032px] mx-auto h-16 sm:h-20 mb-12 sm:mb-20' },
          // The SVG for the entire bar background
          React.createElement(TabBarDeco, { 
            className: 'absolute inset-0 w-full h-full text-brand-dark', 
            // NOTE: "none" will cause stretching. If you want it to scale proportionally, use "xMidYMid meet"
            preserveAspectRatio: "none" 
          }),
          // Container for the clickable text labels
          // FIX: Changed items-start and pt-3 to items-center to fix vertical alignment
          React.createElement('div', { className: 'relative z-10 flex justify-around items-center h-full pb-7' },
            tabs.map(tab => (
              React.createElement('button', {
                key: tab,
                onClick: () => setActiveTab(tab),
                // FIX: Added responsive text size to prevent awkward squeezing on mobile
                className: `text-[10px] sm:text-sm font-bold transition-colors duration-300 text-center px-1 ${activeTab === tab ? 'text-brand-black' : 'text-brand-gray hover:text-white'}`
              }, tab)
            ))
          )
        ),

        // --- FIX 2: CONTENT FRAME RESPONSIVENESS ---
        // FIX: Removed `aspect-[1032/671]` to allow the container to grow vertically with its content.
        // Added `pb-10` to ensure there's padding at the bottom inside the frame.
        React.createElement('div', { className: 'relative w-full max-w-[1032px] mx-auto mt-[-2.5rem] pb-10' },
          React.createElement(AuthFrame, {
            className: 'absolute inset-0 w-full h-full text-brand-beige z-0',
            preserveAspectRatio: "none"
          }),
          // FIX: Removed `h-full` and `overflow-y-auto`. The container now grows naturally.
          // Added responsive padding p-6 sm:p-10
          React.createElement('div', { className: 'relative z-10 p-6 sm:p-10' },
            // --- Content will be based on the activeTab (No changes below this point in the component) ---
            activeTab === 'Profile' && React.createElement('div', null,
                React.createElement('div', { className: 'flex items-center gap-x-4' },
                    React.createElement('img', { src: userData.profilePic, alt: 'Profile', className: 'w-16 h-16 flex' }),
                    React.createElement('div', { className: 'flex-grow' },
                      React.createElement('h3', { className: 'text-xl font-bold' }, userData.fullname),
                      React.createElement('p', { className: 'text-gray-500 text-sm' }, userData.email)
                    ),
                    !userData.emailVerified && React.createElement(DecoratedButton, { size: "md" }, 'Edit')
                ),
                React.createElement('hr', { className: 'my-6 border-gray-300' }),
                React.createElement('form', { onSubmit: handleSubmit, className: 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4' },
                    React.createElement(DecoratedInput, { id: 'fullname', name: 'fullname', label: 'Full Name', value: userData.fullname, onChange: handleChange }),
                    React.createElement(DecoratedInput, { id: 'phone_number', name: 'phone_number', label: 'Phone Number*', value: userData.phone_number, onChange: handleChange }),
                    React.createElement('div', { key: 'gender-div' },
                        React.createElement('label', { htmlFor: 'gender', className: 'block text-xs font-medium text-gray-700 mb-1' }, 'Gender'),
                        React.createElement('div', { className: 'relative h-8 group' },
                            React.createElement(DecoratedInput, { id: 'gender-base', label: '' }),
                            React.createElement('select', {
                                name: 'gender', id: 'gender', value: userData.gender || 'Female', onChange: handleChange,
                                className: 'absolute inset-0 z-20 appearance-none w-full h-full bg-transparent border-none focus:outline-none px-3 text-sm text-gray-800'
                            }, React.createElement('option', null, 'Female'), React.createElement('option', null, 'Male'), React.createElement('option', null, 'Other')),
                            React.createElement(FiChevronDown, { className: 'absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10' })
                        )
                    ),
                    React.createElement(DecoratedInput, { id: 'alternate_phone', name: 'alternate_phone', label: 'Alternate Phone Number', value: userData.alternate_phone || '', placeholder: 'Optional', onChange: handleChange }),
                    React.createElement(DecoratedInput, { id: 'teamName', name: 'teamName', label: 'Team Name', value: userData.teamName || '', onChange: handleChange }),
                    React.createElement(DecoratedInput, { id: 'collegename', name: 'collegename', label: 'College', value: userData.collegename, onChange: handleChange }),
                    React.createElement(DecoratedInput, { id: 'city', name: 'city', label: 'City', value: userData.city, onChange: handleChange }),
                    React.createElement(DecoratedInput, { id: 'state', name: 'state', label: 'State', value: userData.state, onChange: handleChange })
                ),
                React.createElement('div', { className: 'flex items-center gap-x-3 mt-8 border-t border-gray-300 pt-10' },
                    React.createElement(FiMail, { className: 'w-8 h-8 text-brand-red flex-shrink-0' }),
                    React.createElement('div', null,
                        React.createElement('p', { className: 'text-sm font-semibold' }, 'Email Address'),
                        React.createElement('p', { className: 'text-sm text-gray-600' }, userData.email),
                        React.createElement('p', { className: 'text-xs text-gray-400' }, `Joined ${userData.registeredOn}`)
                    )
                )
            ),
            activeTab === 'My registration' && React.createElement('div', { className: 'text-center p-8' }, 'My Events Content Goes Here'),
            activeTab === 'Team members' && <AddMembers className="w-full h-full"/>
          )
        )
      )
    )
  );
};

export default ProfilePage;