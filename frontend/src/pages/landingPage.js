// src/pages/landingPage.js

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/landingPage/heroSection';
import Preloader from '../components/Preloader';
import AfterMovieSection from '../components/landingPage/AfterMovieSection';
import TestimonialsSection from '../components/landingPage/TestimonialsSection'; // Import Testimonials

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <Preloader />}
      <HeroSection />
      <AfterMovieSection />
      <TestimonialsSection /> {/* Add the Testimonials section here */}
    </div>
  );
};

export default LandingPage;