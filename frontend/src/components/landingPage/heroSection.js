// src/components/landingPage/heroSection.js

import React from 'react';
import { motion } from 'framer-motion';

import DecorativeButton from '../DecorativeButton';
import bottomBorder from '../../assets/bottom-border.svg';
import backgroundPattern from '../../assets/background-pattern.svg';

const HeroSection = () => {
  // UPDATED: Removed the incorrect 'backgroundSize' property
  const mainContentStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
    backgroundSize: "100% auto",
  };

  return (
    <div className="text-alch-cream">
      <main className="relative flex flex-col justify-center items-center text-center overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 w-full h-full bg-alch-dark" style={mainContentStyle}></div>

        <div className="relative z-10 p-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-alch-red font-modernoir tracking-normal"
          >
            ALCHERINGA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-4 text-base sm:text-lg lg:text-xl font-modernoir"
          >
            STITCH YOUR JOURNEY - ALCHERINGA AWAITS
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <DecorativeButton to="/register" variant="orange">Register</DecorativeButton>
          </motion.div>
        </div>
      </main>

      <footer className="bg-alch-cream py-4">
        <img src={bottomBorder} alt="Decorative Footer Border" className="w-full" />
      </footer>
    </div>
  );
};

export default HeroSection;