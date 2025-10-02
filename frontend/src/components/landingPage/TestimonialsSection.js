// src/components/landingPage/TestimonialsSection.js

import React from 'react';
import { motion } from 'framer-motion';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Import assets
import backgroundPattern from '../../assets/background-pattern.svg';
import headingIconRed from '../../assets/heading-icon-red.svg';
import quoteIcon from '../../assets/quote-icon.svg';
import sliderBar from '../../assets/slider-bar.svg';
import testimonialCardFrame from '../../assets/testimonial-card-frame.svg';
import starFilled from '../../assets/star-filled.svg';
import starEmpty from '../../assets/star-empty.svg';
// UPDATED: Changed to use a .png file for the author picture
import authorPlaceholder from '../../assets/author-placeholder.png';

// Placeholder data for testimonials
const testimonials = [
  { name: 'Lorem Ipsum', title: '(Lorem ipsum)', rating: 4, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.' },
  { name: 'Jane Doe', title: '(Lorem ipsum)', rating: 5, text: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.' },
  { name: 'John Smith', title: '(Lorem ipsum)', rating: 4, text: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.' },
];

const TestimonialCard = ({ name, title, rating, text }) => (
  <div className="relative p-8 text-left text-alch-dark h-full">
    <img src={testimonialCardFrame} alt="" className="absolute inset-0 w-full h-full" />
    <div className="relative z-10 flex flex-col h-full">
      <p className="flex-grow">{text}</p>
      <div className="mt-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={i < rating ? starFilled : starEmpty} alt="star" className="h-5 w-5 mr-1" />
          ))}
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <div className="flex items-center">
          <img src={authorPlaceholder} alt={name} className="h-12 w-12 rounded-full mr-4" />
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const sectionStyle = {
    backgroundImage: `url(${backgroundPattern})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  return (
    <section className="py-16 px-4 sm:px-8 overflow-hidden border-t-4 border-b-4 border-blue-400" style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center text-center font-modernoir text-4xl sm:text-5xl font-extrabold text-alch-dark mb-16"
        >
          <img src={headingIconRed} alt="Decorative Icon" className="h-8 mx-2" />
          TESTIMONIALS
          <img src={headingIconRed} alt="Decorative Icon" className="h-8 mx-2" />
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-alch-dark text-center lg:text-left"
          >
            <img src={quoteIcon} alt="Quote" className="h-16 mx-auto lg:mx-0" />
            <h3 className="text-4xl font-bold mt-4">What our previous Participants are saying</h3>
            <img src={sliderBar} alt="Slider" className="mt-8 mx-auto lg:mx-0" />
          </motion.div>

          {/* Right Column (Slider) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-2"
          >
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} style={{ height: 'auto' }}>
                  <TestimonialCard {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;