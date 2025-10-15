import React from 'react';
import { useNavigate } from "react-router-dom";

// Assets
import logo from '../../assets/alcher-logo.svg';
import searchBg from '../../assets/peachish-search-back.svg';
import blackBanner from '../../assets/plain-black-bg.svg';
import dancer from '../../assets/group-dance.svg';
import compIconBg from '../../assets/comp-icon-bg.svg';
import registrationButtonBg from '../../assets/button-frame-cream.svg';
import registrationButtonHoverBg from '../../assets/button-frame-orange.svg';

// Mock competitions data
const competitionsData = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "COMP NAME",
  image: dancer,
}));

const CompetitionCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/register/${id}`);
  };

  return (
    <div className="relative group cursor-pointer w-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img src={compIconBg} alt="comp bg" className="absolute inset-0 w-full h-full object-cover" />
        <img 
          src={image} 
          alt="dancer" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative w-full h-full flex flex-col justify-end items-center text-center text-white font-pixel p-4">
          {/* Default View */}
          <div className="flex flex-col items-center justify-end w-full h-full transition-opacity duration-300 group-hover:opacity-0">
            <h3 className="text-lg md:text-xl mb-2 flex items-center justify-center gap-2">
              <span>⚘</span>{name}<span>⚘</span>
            </h3>
            {/* Registration Button */}
            <div className="relative mt-auto w-full flex justify-center">
              <img src={registrationButtonBg} alt="button frame" className="h-10 md:h-12 w-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-black text-xs md:text-sm">Registration</span>
              </div>
            </div>
          </div>

          {/* Hover View */}
          <div className="absolute inset-0 p-4 md:p-6 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="text-lg md:text-xl mb-2">{name}</h3>
            <p className="text-xs md:text-sm mb-3 px-2 sm:px-4">
              This is a brief description of the competition. Add details about rules, theme, or highlights here.
            </p>
            {/* Hover Registration Button */}
            <div 
              className="absolute bottom-4 md:bottom-6 cursor-pointer"
              onClick={handleRegisterClick}
            >
              <img src={registrationButtonHoverBg} alt="button frame" className="h-10 md:h-12 w-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-black text-xs md:text-sm">Registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompetitionsPage = () => {
  return (
    <div className="bg-alch-cream min-h-screen">
      {/* Top Header with Logo */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:px-12 gap-4 sm:gap-0">
        <img src={logo} alt="Alcher Logo" className="h-12 sm:h-14 md:h-16" />
        {/* Search Bar */}
        <div className="relative w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full sm:w-64 px-4 py-2 rounded text-black placeholder-black"
            style={{
              backgroundImage: `url(${searchBg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="relative mx-4 md:mx-12 my-6 md:my-8">
        <img src={blackBanner} alt="banner" className="w-full h-12 sm:h-16 md:h-20 object-cover rounded-md" />
        <h2 className="absolute inset-0 flex items-center justify-center text-white font-pixel text-xl sm:text-2xl md:text-3xl">
          ART TALKIES
        </h2>
      </div>

      {/* Competitions Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {competitionsData.map((comp) => (
          <CompetitionCard key={comp.id} id={comp.id} name={comp.name} image={comp.image} />
        ))}
      </div>
    </div>
  );
};

export default CompetitionsPage;
