// src/pages/NotFoundPage.js
import React from 'react';

// --- THIS IS THE FIX ---
// 1. We use the EXACT import method from your working LandingPage.js
import backgroundPattern from '../assets/background-pattern.svg';
import { ReactComponent as ErrorSVG } from '../assets/404error.svg';

const NotFoundPage = () => {
  const patternOverlayStyle = {
    // 2. We use the imported 'backgroundPattern' variable directly in the url().
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',

    // 3. We apply a filter to slightly darken the pattern, ensuring it's visible on the beige background.
    filter: 'brightness(90%) contrast(110%)',
  };

  return (
    // Main container with the solid beige background
    React.createElement('div', { className: 'relative min-h-screen bg-brand-beige flex items-center justify-center' },
      
      // The pattern overlay div, using the corrected style
      React.createElement('div', {
        style: patternOverlayStyle,
        // Opacity is set to 100% because the filter is now handling the visual effect.
        className: 'absolute inset-0 opacity-100',
      }),
      
      // The "404 OOPS!" content
      React.createElement('div', { className: 'relative z-10' },
        React.createElement(ErrorSVG, null)
      )
    )
  );
};

export default NotFoundPage;