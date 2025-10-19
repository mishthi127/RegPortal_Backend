import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DecorativeButton from "../AuthPage/DecoratedButton";
import bottomBorder from "../../assets/bottom-border.svg";
import backgroundPattern from "../../assets/background-pattern.svg";
import flower from "../../assets/star-filled.svg";
import mbbgpattern from "../../assets/mbbgpatternwh.svg"
import middle_line from "../../assets/Middle_line.svg";

const HeroSection = ({ isAuthenticated }) => {
  const mainContentStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: "repeat-y",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const bgmainContentStyle = {
    backgroundImage: `url(${mbbgpattern})`,
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'center',
    backgroundSize: "100% auto",
  };

  // Dynamic, responsive flower positions
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
  const createFlowers = () => {
    const width = window.innerWidth;

    // Adjust responsiveness
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    return Array.from({ length: 8 }).map((_, i) => {
      // Scale position closer and size smaller on smaller screens
      const positionScale = isMobile ? 0.6 : isTablet ? 0.85 : 1;
      const sizeScale = isMobile ? 0.5 : isTablet ? 0.8 : 1;

      return {
        rotateDir: Math.random() > 0.5 ? 1 : -1,
        delay: i * 0.15,
        duration: 2 + Math.random(),
        // Same pattern as your original but scaled responsively
        top: `${35 + Math.cos(i * 36) * 8 * positionScale + Math.random() * 3}vh`,
        left: `${45 + Math.sin(i * 36) * 15 * positionScale + Math.random() * 3}vw`,
        size: `${(80 + Math.random() * 80) * sizeScale}px`,
      };
    });
  };

  setFlowers(createFlowers());

  // Update flowers on window resize
  const handleResize = () => setFlowers(createFlowers());
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
    <div className="text-alch-cream overflow-hidden">
      <main className="relative flex flex-col justify-center items-center text-center min-h-screen py-16 sm:py-24 md:py-32">
        {/* Dark background with pattern */}
        <div className="absolute inset-0 bg-alch-dark pixelbg"></div>

        {/* Flowers */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {flowers.map((f, i) => (
            <motion.img
              key={i}
              src={flower}
              alt="flower"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.7, 0],
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
                top: f.top,
                left: f.left,
                width: f.size,
                height: f.size,
                transform: "translate(-50%, -50%)",
                zIndex: 5,
              }}
            />
          ))}
        </div>

        {/* Text */}
<motion.h1
  initial={{ opacity: 0, scale: 0.85 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
  className="relative z-10 font-display font-bold text-alch-red tracking-wide leading-[1.05] 
             text-[clamp(4rem,10vw,9rem)] text-center"
>
  ALCHERINGA
</motion.h1>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 2.2 }}
  className="relative z-10  font-display font-light text-brand-beige tracking-wide 
             text-[clamp(1rem,3vw,1.5rem)] text-center"
>
  STITCH YOUR JOURNEY – ALCHERINGA AWAITS
</motion.p>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 2.4 }}
  className="relative z-10 mt-[clamp(2rem,5vw,6rem)]"
>
  {!isAuthenticated && (
    <DecorativeButton to="/register" variant="orange">
      Register
    </DecorativeButton>
  )}
</motion.div>

      </main>


      <div className="bg-black">
        <img src={middle_line} alt="Decorative Footer Border" className="w-full transform scale-y-[-1]"/>
      </div>
      {/* Footer */}
      <footer className="bg-alch-cream">
        <img src={bottomBorder} alt="Decorative Footer Border" className="w-full" />
        <img src={bottomBorder} alt="Decorative Footer Border" className="w-full transform scale-y-[-1]" />
      </footer>
    </div>
  );
};

export default HeroSection;
