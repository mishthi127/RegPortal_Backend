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
        'alch-dark': '#000000',
        'brand-dark': '#171717',
        'brand-beige': '#EEECD9',
        'brand-orange': '#e89f55',
        'brand-red': '#e53e3e',
        'brand-gray': '#6b7280',
        'dark-orange': '#EF5243',
      },
      fontFamily: {
        // Manrope remains your global font
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        // The 'font-modernoir' class now uses Syne
        modernoir: ['Syne', 'sans-serif'],
      },

      // --- ADD THESE NEW SECTIONS ---
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
      },
      // --- END OF NEW SECTIONS ---
    },
  },
  plugins: [],
}