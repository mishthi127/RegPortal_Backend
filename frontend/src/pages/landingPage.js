// src/pages/landingPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/landingPage/heroSection';
import Preloader from '../components/Preloader';
import AfterMovieSection from '../components/landingPage/AfterMovieSection';
import TestimonialsSection from '../components/landingPage/TestimonialsSection';
import {CompModules } from '../components/landingPage/compModules';
import { Pixel } from '../components/landingPage/Pixel';
import { Footer } from '../components/landingPage/Footer';
import { FAQS } from '../components/landingPage/FAQS';

import DecorativeButton from '../components/DecorativeButton';
import logo from '../assets/logo.svg';
import hamburgerIcon from '../assets/hamburger-icon.svg';
import backgroundPattern from '../assets/background-pattern.svg';


const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Style for the background pattern
  const headerBgStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundPosition: 'center',
  };

  return (
    <div>
      {loading && <Preloader />}
      
      <header className="sticky top-0 z-30 shadow-lg">
        <div className="absolute inset-0 bg-alch-dark" style={headerBgStyle}></div>
        <nav className="relative z-10 flex justify-between items-center py-4 px-4 sm:px-8">
          <Link to="/">
            <img src={logo} alt="Alcheringa Logo" className="h-8 sm:h-10" />
          </Link>
          <div className="hidden lg:flex items-center">
            <DecorativeButton to="#" variant="nav">
              <div className="flex space-x-8 px-4 text-sm">
                <Link to="/about" className="text-alch-cream hover:text-white whitespace-nowrap">About us</Link>
                <Link to="/competitions" className="text-alch-cream hover:text-white whitespace-nowrap">  Modules & Competitions</Link>
              </div>
            </DecorativeButton>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/contact" className="text-alch-cream hover:text-white">Contact us</Link>
            <DecorativeButton to="/login" className = "" variant="orange-sm">Login</DecorativeButton>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu}><img src={hamburgerIcon} alt="Menu" className="h-8 w-8" /></button>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-95 z-40 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* --- ADDED: Mobile Menu Content --- */}
        <div className="flex justify-end p-8">
            <button onClick={toggleMenu}>
                {/* Close Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div className="flex flex-col items-center justify-center h-3/4 space-y-8 text-2xl">
          <Link to="/about" onClick={toggleMenu} className="text-alch-cream hover:text-white">About us</Link>
          <Link to="/competitions" onClick={toggleMenu} className="text-alch-cream hover:text-white">Modules & Competitions</Link>
          <Link to="/contact" onClick={toggleMenu} className="text-alch-cream hover:text-white">Contact us</Link>
          <DecorativeButton to="/login" variant="orange-sm" onClick={toggleMenu}>Login</DecorativeButton>
        </div>
        {/* --- END: Mobile Menu Content --- */}
      </div>
      
      {/* Page Content */}
      <HeroSection />
      <CompModules/>
      <Pixel />
      <AfterMovieSection />
      <TestimonialsSection />
      
        <div
          className='bg-[rgba(238,236,217,1)]'
          style={{
              backgroundImage: "url('/whitevector.png')",
              
              backgroundRepeat: "repeat",
          }}   
        >
          <FAQS />
          <Footer />
        </div>
    </div>
  );
};

export default LandingPage;