import { motion } from 'framer-motion';
import backgroundPattern from '../assets/background-pattern.svg';
import topBorder from '../assets/top-border.svg';
import { useEffect } from 'react';

const Preloader = () => {
  const preloaderStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat-y',
    backgroundSize: "100% auto",
    backgroundPosition: 'center',
    // height: '100vh'
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     document.getElementById("shrinkingDiv").style.height = "0px";
  //   }, 100); // small delay to ensure rendering

  //   return () => clearTimeout(timer);
  // }, []);

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

    // <div
    //   id="shrinkingDiv"
    //   className='w-screen bg-red-500 absolute top-0 left-0 origin-top transition-all duration-[3000ms]'
    //   style={preloaderStyle}
    // >
    //   <img src={topBorder} alt="Decorative Top Border" className="w-full" />
    // </div>
  );
};

export default Preloader;