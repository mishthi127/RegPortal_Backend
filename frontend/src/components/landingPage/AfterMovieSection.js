// src/components/landingPage/AfterMovieSection.js

//import React from 'react';
import { motion } from 'framer-motion';

import headingIconRed from '../../assets/heading-icon-red.svg';
import photoBorderRed from '../../assets/photo-border-red.svg';
// ADDED: Import for the background pattern
import backgroundPattern from '../../assets/background-pattern.svg';

const AfterMovieSection = () => {
  const youtubeVideoId = 'bk3LJ7ECy90';
  // UPDATED: Added autoplay=1 and mute=1 parameters
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`;

  // ADDED: Style object for the background pattern
  const sectionStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  const videoFrameStyle = {
    border: '16px solid transparent',
    borderImageSource: `url(${photoBorderRed})`,
    borderImageSlice: 16,
    borderImageRepeat: 'repeat',
  };

  return (
    // UPDATED: Added style and removed bg-alch-cream (it's the default now)
    <section className="py-16 px-4 sm:px-8 text-alch-dark overflow-hidden" style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center text-center font-modernoir text-3xl sm:text-4xl lg:text-5xl font-extrabold text-alch-red mb-12 flex-wrap"
        >
          <img src={headingIconRed} alt="Decorative Icon" className="h-6 sm:h-8 mx-2 hidden sm:block" />
          <span className="whitespace-nowrap">CHECK OUT OUR ALCHERINGA 24</span>
          <span className="whitespace-nowrap">AFTER MOVIE</span>
          <img src={headingIconRed} alt="Decorative Icon" className="h-6 sm:h-8 mx-2 hidden sm:block" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div 
            className="relative pt-[56.25%] bg-black overflow-hidden"
            style={videoFrameStyle}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={youtubeEmbedUrl}
              title="Alcheringa 2024 Aftermovie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AfterMovieSection;