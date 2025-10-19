// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alch-red': '#EF5243',
        'alch-cream': '#EEECD9',
        'alch-dark': '#090909',
        'brand-dark': '#090909',
        'brand-beige': '#EEECD9',
        'brand-orange': '#e89f55',
        'brand-red': '#e53e3e',
        'brand-gray': '#6b7280',
        'dark-orange': '#EF5243',
      },
      // --- CORRECTED FONT FAMILY SECTION ---
      fontFamily: {
        // Manrope is now your default body font via 'font-sans'
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        // TT Modernoir is your special heading font via 'font-display'
        display: ['TT Modernoir', 'sans-serif'],
      },
      // --- END OF FONT SECTION ---
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
      },

      keyframes: {
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    spinFlower: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
  animation: {
    fadeInUp: 'fadeInUp 0.5s ease-out forwards',
    'flower-spin': 'spinFlower 6s linear infinite',
  },

    },
  },
  plugins: [],
}