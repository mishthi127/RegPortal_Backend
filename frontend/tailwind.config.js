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
        // It's a good idea to add the orange from the design here
        'alch-orange': '#E87D00',
      },
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        modernoir: ['Syne', 'sans-serif'],
        // Add the pixel font here
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}