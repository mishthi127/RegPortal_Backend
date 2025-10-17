// src/components/landingPage/heroSection.js

import React from 'react';
import { motion } from 'framer-motion';

import DecorativeButton from '../AuthPage/DecoratedButton';
import bottomBorder from '../../assets/bottom-border.svg';
import backgroundPattern from '../../assets/background-pattern.svg';
import mbbgpattern from "../../assets/mbbgpatternwh.svg"
import flower from "../../assets/star-filled.svg";

const HeroSection = ({ isAuthenticated }) => {
  const mainContentStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: "repeat-y",
    backgroundPosition: "center",
    backgroundSize: "100% auto",
  };
  const bgmainContentStyle = {
    backgroundImage: `url(${mbbgpattern})`,
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
    backgroundSize: "100% auto",
  };

  // Fixed flower positions, computed once
  const flowers = React.useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        left: 45 + Math.sin(i * 36) * 15 + Math.random() * 5,
        top: 35 + Math.cos(i * 36) * 8 + Math.random() * 5,
        size: 80 + Math.random() * 80,
        duration: 2 + Math.random(), // faster fade
        delay: i * 0.15, // stagger
        rotateDir: Math.random() > 0.5 ? 1 : -1,
      })),
    []
  );

  return (
    <div className="text-alch-cream overflow-hidden">
      <main className="relative flex flex-col justify-center items-center text-center min-h-[70vh] py-24 sm:py-32">
        {/* Dark background with pattern */}
        <div
          className="absolute inset-0 bg-alch-dark"
          style={mainContentStyle}
        ></div>

        {/* Flowers appearing and disappearing naturally */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {flowers.map((f, i) => (
            <motion.img
              key={i}
              src={flower}
              alt="flower"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.7, 0], // fade in and out
                scale: [0.9, 1.1, 0.95],
                translateY: [0, -8, 0],
                rotate: [0, 5 * f.rotateDir, -5 * f.rotateDir, 0],
              }}
              transition={{
                duration: f.duration,
                delay: f.delay,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: `${f.top}%`,
                left: `${f.left}%`,
                width: f.size,
                height: f.size,
                transform: "translate(-50%, -50%)",
                zIndex: 5,
              }}
            />
          ))}
        </div>

        {/* Text appears after flowers start fading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          className="relative z-10 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-alch-red font-modernoir tracking-wide"
        >
          ALCHERINGA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="relative z-10 mt-4 text-base sm:text-lg lg:text-xl font-modernoir"
        >
          STITCH YOUR JOURNEY - ALCHERINGA AWAITS
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="relative z-10 mt-8"
        >
          {!isAuthenticated && (
            <DecorativeButton to="/register" variant="orange">
              Register
            </DecorativeButton>
          )}
        </motion.div>
      </main>

      <footer className="bg-alch-cream py-4">
        <img src={bottomBorder} alt="Decorative Footer Border" className="w-full" />
        <img src={bottomBorder} alt="Decorative Footer Border" className="w-full transform scale-y-[-1]" />
      </footer>
    </div>
  );
};

export default HeroSection;
