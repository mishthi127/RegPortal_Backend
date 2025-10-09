import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import your default placeholder image from assets
import authorPlaceholder from '../assets/author-placeholder.png';

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // This effect handles closing the dropdown if you click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Use the user's image if available, otherwise use the placeholder
  const profileImage = user?.img && !user.img.includes('user-default.png') 
    ? `http://localhost:8000${user.img}` // Assuming the backend provides a relative URL
    : authorPlaceholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img 
          src={profileImage} 
          alt="User Profile" 
          className="h-10 w-10 rounded-full object-cover border-2 border-alch-cream" 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-alch-dark rounded-md shadow-lg py-1 z-50 border border-alch-cream/20">
          <Link to="/profile" className="block px-4 py-2 text-sm text-alch-cream hover:bg-alch-red">
            My Profile
          </Link>
          <Link to="/team" className="block px-4 py-2 text-sm text-alch-cream hover:bg-alch-red">
            Team Members
          </Link>
          <Link to="/registrations" className="block px-4 py-2 text-sm text-alch-cream hover:bg-alch-red">
            My Registrations
          </Link>
          <div className="border-t border-alch-cream/20 my-1"></div>
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full text-left px-4 py-2 text-sm text-alch-cream hover:bg-alch-red"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;