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
      },
      fontFamily: {
        // Manrope remains your global font
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        // The 'font-modernoir' class now uses Syne
        modernoir: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}