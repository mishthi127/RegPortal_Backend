// src/components/AuthPage/AuthLayout.js
import React from 'react';

const backgroundPattern = require('../../assets/background-pattern.svg').default;
const authFrame = require('../../assets/auth-frame.svg').default;
const authImg = require('../../assets/auth-img.svg').default;

const AuthLayout = ({ children }) => {
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

  return (
    React.createElement('div', { className: "min-h-screen bg-brand-dark flex items-center justify-center p-4 font-body" },
      React.createElement('div', { style: pageStyle, className: 'absolute inset-0 opacity-20' }),
      
      // The main container. On desktop (md), it has a fixed aspect ratio. On mobile, its height is automatic.
      React.createElement('div', { className: 'relative w-full max-w-[1032px] md:aspect-[1032/671]' },
        
        // The SVG frame, stretched to fill the container whatever its shape.
        React.createElement('div', { style: frameStyle, className: 'absolute inset-0 z-0' }),
        
        // The content layer.
        React.createElement('div', { className: 'absolute inset-0 z-10' },
          
          // --- THIS IS THE KEY FIX ---
          // A flex container that is a column on mobile ('flex-col') and a row on desktop ('md:flex-row').
          React.createElement('div', { className: 'flex flex-col md:flex-row h-full' },
            
            // The Left Image Panel.
            // On mobile, it's a 200px tall block. On desktop, it takes 46.1% of the width.
            React.createElement('div', { 
                style: leftPanelStyle, 
                className: 'w-full h-48 md:w-[46.1%] md:h-full flex-shrink-0' 
            }),
            
            
            React.createElement('div', { className: "w-full p-8 md:w-[53.9%] md:flex md:flex-col md:justify-center md:overflow-hidden" },
              React.createElement('div', null, children)
            )
          )
        )
      )
    )
  );
};

export default AuthLayout;