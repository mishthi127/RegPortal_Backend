// src/pages/landingPage.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Using the custom axios instance

// Component Imports
import HeroSection from '../components/landingPage/heroSection';
import Preloader from '../components/Preloader';
import AfterMovieSection from '../components/landingPage/AfterMovieSection';
import TestimonialsSection from '../components/landingPage/TestimonialsSection';
import { Pixel } from '../components/landingPage/Pixel';
import { Footer } from '../components/landingPage/Footer';
import { FAQS } from '../components/landingPage/FAQS';
import DecorativeButton from '../components/DecorativeButton';
import ProfileDropdown from '../components/ProfileDropdown';

// Asset Imports
import logo from '../assets/logo.svg';
import hamburgerIcon from '../assets/hamburger-icon.svg';
import backgroundPattern from '../assets/background-pattern.svg';
import { AddMembers } from '../components/AddMembers';


const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for authentication and user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const faqRef = useRef(null);
  const testimonialRef = useRef(null);

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center', // center the element vertically in the viewport
      inline: 'nearest'
    });
    
  };

  const scrollToTestimonials = () => {
    testimonialRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center', // center the element vertically in the viewport
      inline: 'nearest'
    });
  };


  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false); }, 2000);

    // Check for authentication token on component mount
    const token = localStorage.getItem('access');
    if (token) {
      axiosInstance.get('/profile/')
        .then(res => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(err => {
          // This will only run if the token and refresh token are both invalid
          console.error("Auth check failed:", err);
        });
    }

    return () => clearTimeout(timer);
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  const headerBgStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundPosition: 'center',
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
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
                <Link to="/competitions" className="text-alch-cream hover:text-white whitespace-nowrap">Modules & Competitions</Link>
              </div>
            </DecorativeButton>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/contact" className="text-alch-cream hover:text-white">Contact us</Link>
            {isAuthenticated ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <DecorativeButton to="/login" variant="orange-sm">Login</DecorativeButton>
            )}
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu}><img src={hamburgerIcon} alt="Menu" className="h-8 w-8" /></button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-95 z-40 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-8">
          <button onClick={toggleMenu}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-3/4 space-y-8 text-2xl">
          <Link to="/about" onClick={toggleMenu} className="text-alch-cream hover:text-white">About us</Link>
          <Link to="/competitions" onClick={toggleMenu} className="text-alch-cream hover:text-white">Modules & Competitions</Link>
          <Link to="/contact" onClick={toggleMenu} className="text-alch-cream hover:text-white">Contact us</Link>

          {/* Conditional links for mobile menu */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={toggleMenu} className="text-alch-cream hover:text-white">My Profile</Link>
              <Link to="/team" onClick={toggleMenu} className="text-alch-cream hover:text-white">Team Members</Link>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="text-alch-red hover:text-white font-bold text-2xl bg-transparent border-none"
              >
                Logout
              </button>
            </>
          ) : (
            <DecorativeButton to="/login" variant="orange-sm" onClick={toggleMenu}>Login</DecorativeButton>
          )}
        </div>
      </div>

      {/* Page Content */}
      <HeroSection isAuthenticated={isAuthenticated} />
      <Pixel />
      
        <div
          className='bg-alch-cream landingbg'  
        >
            <AfterMovieSection />
            <TestimonialsSection ref={testimonialRef}/>
            <FAQS ref={faqRef}/>
            <Footer scrollToFAQ={scrollToFAQ} scrollToTestimonials={scrollToTestimonials}/>
        </div>
        
        {/* <div className='mt-[10px] pt-[10px] pb-[10px] flex justyfy-center items-center bg-black'>
          <AddMembers/>
  
        </div> */}
    </div>
  );
};

export default LandingPage;