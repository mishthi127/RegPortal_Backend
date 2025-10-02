// Assumes this file is in a subfolder like 'src/components/landingPage/'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Final: Correct relative paths for components and assets
import DecorativeButton from '../DecorativeButton'; 
import logo from '../../assets/logo.svg';
import bottomBorder from '../../assets/bottom-border.svg';
import backgroundPattern from '../../assets/background-pattern.svg';
import hamburgerIcon from '../../assets/hamburger-icon.svg';

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainContentStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // FIXED: Removed 'bg-alch-dark' to allow the cream body background to show
    <div className="text-alch-cream">
      <header className="sticky top-0 z-30 bg-black py-4 px-4 sm:px-8 shadow-lg">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Alcheringa Logo" className="h-8 sm:h-10" />
          </Link>
          
          <div className="hidden lg:flex items-center">
            <DecorativeButton to="#" variant="nav">
              <div className="flex space-x-8 px-4 text-sm">
                <Link to="/about" className="text-alch-cream hover:text-white whitespace-nowrap">About us</Link>
                <Link to="/competitions" className="text-alch-cream hover:text-white whitespace-nowrap">Modules & Competitions</Link>
              </div>
            </DecorativeButton>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/contact" className="hover:text-white">Contact us</Link>
            {/* FIXED: Uses the new 'orange-sm' variant for a smaller button */}
            <DecorativeButton to="/login" variant="orange-sm">Login</DecorativeButton>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <img src={hamburgerIcon} alt="Menu" className="h-8 w-8" />
            </button>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-95 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-8">
            <button onClick={toggleMenu}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div className="flex flex-col items-center justify-center h-3/4 space-y-8 text-2xl">
          <Link to="/about" onClick={toggleMenu}>About us</Link>
          <Link to="/competitions" onClick={toggleMenu}>Modules & Competitions</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact us</Link>
          <DecorativeButton to="/login" variant="orange-sm" onClick={toggleMenu}>Login</DecorativeButton>
        </div>
      </div>

      <main className="relative flex flex-col justify-center items-center text-center min-h-[calc(100vh-88px)] p-4 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-alch-dark opacity-90" style={mainContentStyle}></div>
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
           // AFTER
className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold text-alch-red font-modernoir"
          >
            ALCHERINGA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-4 text-base sm:text-lg lg:text-xl tracking-wider font-modernoir"
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
        
        <motion.img
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 2.6, ease: "easeOut" }}
          src={bottomBorder}
          alt="Decorative Bottom Border"
          className="w-full absolute bottom-0 left-0"
        />
      </main>
    </div>
  );
};

export default HeroSection;