import { motion, useMotionValue } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useState, useRef, useCallback, useEffect, forwardRef } from "react";

// Assuming these paths are correct
import backgroundPattern from "../../assets/background-pattern.svg";
import headingIconRed from "../../assets/heading-icon-red.svg";
import quoteIcon from "../../assets/quote-icon.svg";
import slideBarLeftDeco from "../../assets/slide-bar-leftdeco.svg";
import testimonialCardFrame from "../../assets/testimonial-card-frame2.svg";
import starFilled from "../../assets/star-filled.svg";
import starEmpty from "../../assets/star-empty.svg";
import authorPlaceholder from "../../assets/author-placeholder.png";

const testimonials = [
  { name: "Lorem Ipsum", title: "(Lorem ipsum)", rating: 4, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley" },
  { name: "Lorem Ipsum", title: "(Lorem ipsum)", rating: 4, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley" },
  { name: "Lorem Ipsum", title: "(Lorem ipsum)", rating: 4, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley" },
  { name: "Alice Johnson", title: "(Lorem ipsum)", rating: 5, text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
  { name: "Bob Williams", title: "(Lorem ipsum)", rating: 3, text: "Decent experience overall. Could be improved but still valuable." },
];

const TestimonialCard = ({ name, title, rating, text }) => (
  <div className="flex flex-col w-[309px]">
    <div
      className="flex flex-col h-[303px]"
      style={{
        backgroundImage: `url(${testimonialCardFrame})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col flex-grow px-8 pt-8 pb-14">
        <p className="flex-grow text-alch-dark">{text}</p>
        <div className="flex items-center mt-4">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={i < rating ? starFilled : starEmpty} alt="star" className="h-5 w-5 mr-1 mb-2" />
          ))}
        </div>
      </div>
    </div>
    <div className="flex items-center pt-1">
      <img src={authorPlaceholder} alt={name} className="h-12 w-12 mr-4" />
      <div>
        <p className="font-bold text-alch-dark">{name}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = forwardRef((props, ref) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  
  // Simple motion value without spring physics
  const thumbMotionX = useMotionValue(0);

  const trackWidth = 272;
  const thumbWidth = 68;
  const maxDragX = trackWidth - thumbWidth;

  const handleSlideChange = useCallback((swiper) => {
    const progress = swiper.progress * 100;
    const clampedProgress = Math.max(0, Math.min(100, progress));
    setScrollProgress(clampedProgress);
    
    // Update thumb position directly when not dragging
    if (!isDragging) {
      const newX = (clampedProgress / 100) * maxDragX;
      thumbMotionX.set(newX);
    }
  }, [isDragging, maxDragX, thumbMotionX]);

  // Handle track click for jumping to position
  const handleTrackClick = useCallback((event) => {
    if (!swiperInstance || !constraintsRef.current) return;
    
    const trackRect = constraintsRef.current.getBoundingClientRect();
    const clickX = event.clientX - trackRect.left - (thumbWidth / 2);
    const newX = Math.max(0, Math.min(maxDragX, clickX));
    const newProgress = newX / maxDragX;
    
    swiperInstance.setProgress(newProgress, 300);
  }, [swiperInstance, maxDragX, thumbWidth]);

  // Simple thumb drag handler
  const handleThumbDrag = useCallback((event, info) => {
    if (!swiperInstance) return;

    const newX = Math.max(0, Math.min(maxDragX, info.point.x));
    const newProgress = newX / maxDragX;

    // Update swiper instantly
    swiperInstance.setProgress(newProgress, 0);
    
    // Update thumb position directly
    thumbMotionX.set(newX);
  }, [swiperInstance, maxDragX, thumbMotionX]);

  const handleThumbDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleThumbDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Update thumb position when progress changes
  useEffect(() => {
    if (!isDragging) {
      const newX = (scrollProgress / 100) * maxDragX;
      thumbMotionX.set(newX);
    }
  }, [scrollProgress, isDragging, maxDragX, thumbMotionX]);

  const sectionStyle = {
    background:"transparent",
  };

  return (
    <section ref={ref} className="py-16" style={sectionStyle} >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center text-center font-modernoir text-[30px] lg:text-[48px] font-extrabold text-alch-dark mb-16"
        >
          <img src={headingIconRed} alt="Decorative Icon" className="h-5 sm:h-6 mx-2" />
          TESTIMONIALS
          <img src={headingIconRed} alt="Decorative Icon" className="h-5 sm:h-6 mx-2" />
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pl-4 sm:pl-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-alch-dark text-center lg:text-left"
          >
            <img src={quoteIcon} alt="Quote" className="h-[38.12px] lg:h-16 mx-auto lg:mx-0" />
            <h3 className="text-[16px] lg:text-3xl font-bold mt-4 leading-snug w-full max-w-[272px] mx-auto lg:mx-0 text-left">What our previous<br className="block" /> Participants  are<br className="block" /> saying</h3>
            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-2">
              <img src={slideBarLeftDeco} alt="Left Deco" className="w-6 h-6" />
              <div
                ref={constraintsRef}
                className="relative h-[20px] cursor-pointer group"
                style={{
                  width: `${trackWidth}px`,
                  background: 'linear-gradient(90deg, #FED4A8 -25.55%, #FFB261 125%)',
                }}
                onClick={handleTrackClick}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#FFB261] transition-colors duration-200 group-hover:bg-[#FFA347]"
                  style={{ 
                    width: `${thumbWidth}px`,
                    x: thumbMotionX,
                  }}
                  drag="x"
                  dragConstraints={constraintsRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={handleThumbDragStart}
                  onDrag={handleThumbDrag}
                  onDragEnd={handleThumbDragEnd}
                />
              </div>
              <img
                src={slideBarLeftDeco}
                alt="Right Deco"
                className="w-6 h-6 scale-x-[-1]"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }} //because of this, overflow in mobile
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-2"
          >
            <Swiper
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              onProgress={handleSlideChange}
              slidesPerView={'auto'}
              spaceBetween={24}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="!w-auto h-auto">
                  <TestimonialCard {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;