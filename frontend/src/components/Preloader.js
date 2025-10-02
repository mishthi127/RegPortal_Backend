// src/components/Preloader.js

import React from 'react';
import { motion } from 'framer-motion';

// Imports updated: bottomBorder is no longer needed
import backgroundPattern from '../assets/background-pattern.svg';
import topBorder from '../assets/top-border.svg';

const Preloader = () => {
  const preloaderStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      style={preloaderStyle}
      className="fixed inset-0 z-50 flex flex-col justify-start bg-alch-cream" // Changed to justify-start
    >
      <img src={topBorder} alt="Decorative Top Border" className="w-full" />
      {/* The bottom border <img> tag has been removed from here */}
    </motion.div>
  );
};

export default Preloader;