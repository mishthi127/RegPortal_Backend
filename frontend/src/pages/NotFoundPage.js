// src/pages/NotFoundPage.js
import React from 'react';
import backgroundPattern from '../assets/background-pattern.svg';
import { ReactComponent as ErrorSVG } from '../assets/404error.svg';

const NotFoundPage = () => {
  const patternOverlayStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',
    filter: 'brightness(90%) contrast(110%)',
  };

  return (
    React.createElement('div', { className: 'relative min-h-screen bg-brand-beige flex items-center justify-center' },
      
      React.createElement('div', {
        style: patternOverlayStyle,
        className: 'absolute inset-0 opacity-100',
      }),
      
      React.createElement('div', { className: 'relative z-10' },
        React.createElement(ErrorSVG, null)
      )
    )
  );
};

export default NotFoundPage;