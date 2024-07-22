/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: 'rgba(35, 32, 32, 1)',
        navBlack: 'rgba(35, 32, 32, 0.3)',
        customText: 'rgba(244, 244, 244, 1)',
        customOrange: 'rgba(255, 115, 21, 1)',
        customBackground: 'rgba(35, 32, 32, 1)',
        customFooter: 'rgba(244, 244, 244, 0.42)',
      },
      fontFamily: {
        footerText: ['Stint Ultra Condensed', 'cursive', 'serif'],
        paragraph: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};