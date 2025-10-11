// src/components/AuthPage/AuthLayout.js
import React from 'react';

const backgroundPattern = require('../../assets/background-pattern.svg').default;
const authFrame = require('../../assets/auth-frame.svg').default;
const authImg = require('../../assets/auth-img.svg').default;

const AuthLayout = ({ children, promoTitle, promoSubtitle, sizeMode = 'fixed' }) => {
  const pageStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',
  };
  const frameStyle = {
    backgroundImage: `url(${authFrame})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  const leftPanelStyle = {
    backgroundImage: `url(${authImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const containerClasses = [
    'relative', 'w-full', 'max-w-[1032px]', 'animate-fadeInUp'
  ];
  if (sizeMode === 'fixed') {
    containerClasses.push('lg:aspect-[1032/671]');
  }

  const rightPanelClasses = ['w-full', 'p-8', 'lg:w-[53.9%]'];
  if (sizeMode === 'fixed') {
    rightPanelClasses.push('lg:flex', 'lg:flex-col', 'lg:justify-center', 'lg:overflow-hidden');
  }

  return (
    React.createElement('div', { className: "min-h-screen bg-brand-dark flex justify-center p-4 font-body lg:items-center" },
      React.createElement('div', { style: pageStyle, className: 'absolute inset-0 opacity-20' }),
      React.createElement('div', { className: containerClasses.join(' ') },
        React.createElement('div', { style: frameStyle, className: 'absolute inset-0 z-0' }),
        React.createElement('div', { className: 'relative z-10 flex flex-col lg:flex-row lg:h-full' },
          React.createElement('div', { 
            style: { ...leftPanelStyle, backgroundPosition: 'center' },
            className: 'w-full h-48 lg:w-[46.1%] lg:h-auto flex-shrink-0 flex flex-col justify-end items-center text-center p-8' 
          }),
          React.createElement('div', { className: rightPanelClasses.join(' ') },
            React.createElement('div', null, children)
          )
        )
      )
    )
  );
};

export default AuthLayout;