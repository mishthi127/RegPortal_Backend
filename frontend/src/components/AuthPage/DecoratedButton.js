// src/components/AuthPage/DecoratedButton.js
import React from 'react';
import { Link } from 'react-router-dom';

// Import all the SVG frames you might need
import { ReactComponent as ButtonFrameOrange } from '../../assets/button-frame-orange.svg';
import { ReactComponent as ButtonFrameCream } from '../../assets/button-frame-cream.svg';

const DecoratedButton = ({ 
  children, 
  to, 
  onClick, 
  type = 'button', 
  variant = 'orange', // 'orange' or 'cream'
  size = 'md'        // 'sm' (small, 32px) or 'md' (medium, 38px)
}) => {
  // Determine if this is a link or a button
  const isLink = !!to;
  const Component = isLink ? Link : 'button';

  // --- Dynamic Styling based on Props ---
  const sizeClasses = size === 'sm' ? 'h-8' : 'h-[38px]';
  
  let frameClasses = 'text-brand-orange group-hover:text-dark-orange';
  let textClasses = 'text-black';

  if (variant === 'cream') {
    frameClasses = 'text-brand-beige group-hover:text-white'; // Assuming you want cream to glow to white
    textClasses = 'text-brand-dark';
  }

  // Choose the right SVG component based on the variant
  const FrameComponent = variant === 'cream' ? ButtonFrameCream : ButtonFrameOrange;
  
  // --- Props for the root component (either <Link> or <button>) ---
  const componentProps = {
    onClick: onClick,
    // Add the dynamic and base classes
    className: `relative ${sizeClasses} group inline-flex items-center justify-center`
  };

  if (isLink) {
    componentProps.to = to;
  } else {
    componentProps.type = type;
  }

  return (
    React.createElement(Component, componentProps,
      React.createElement(FrameComponent, {
        className: `absolute top-0 left-0 w-full h-full transition-colors duration-200 pointer-events-none ${frameClasses}`,
        preserveAspectRatio: "none"
      }),
      React.createElement('span', { className: `relative z-10 font-bold text-sm px-8 ${textClasses}` }, children)
    )
  );
};

export default DecoratedButton;