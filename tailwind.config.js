/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'
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
        customBlue: 'rgba(0, 43, 91, 1)',
        underlineColor: '#f4e96d',

        'vintage-garden-primary': '#2D4659',
        'vintage-garden-background': '#FDFBDA',
        'vintage-garden-accent': '#819F7F',

        'cosmic-symphony-primary': '#F0EB8D',
        'cosmic-symphony-background': '#413543',
        'cosmic-symphony-accent': '#8F43EE',

        'rustic-charm-primary': '#EA5455',
        'rustic-charm-background': '#F9F5EB',
        'rustic-charm-accent': '#E4BD7D',

        'sunset-serenade-primary': '#210062',
        'sunset-serenade-background': '#009FBD',
        'sunset-serenade-accent': '#77037B',

        'industrial-chic-primary': '#F45050',
        'industrial-chic-background': '#F0F0F0',
        'industrial-chic-accent': '#F9D949',

        'blackout-neutrals-primary': '#F3EFE0',
        'blackout-neutrals-background': '#222222',
        'blackout-neutrals-accent': '#22A39F',

        'vibrant-spectrum-primary': '#4A0E5C',
        'vibrant-spectrum-background': '#CCF0C3',
        'vibrant-spectrum-accent': '#BCA3CA',

        'coastal-sunrise-primary': '#005874',
        'coastal-sunrise-background': '#E6E6D4',
        'coastal-sunrise-accent': '#FFBE00',

        'oceanic-serenity-primary': '#CBE4DE',
        'oceanic-serenity-background': '#2C3333',
        'oceanic-serenity-accent': '#2E4F4F',
      },
      fontFamily: {
        footerText: ['Stint Ultra Condensed', 'cursive', 'serif'],
        paragraph: ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        'underline-height': '0.3em',
      },
    },
  },
  safelist: [
    {
      pattern: /(vintage-garden|cosmic-symphony|rustic-charm|sunset-serenade|industrial-chic|blackout-neutrals|vibrant-spectrum|coastal-sunrise|oceanic-serenity)-(primary|background|accent)/,
    },
  ],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.dotted-background': {
          backgroundImage: 'radial-gradient(circle, gray 1px, transparent 2px)',
          backgroundSize: '20px 20px',
        },
        '.dotted-nav': {
          position: 'relative',
          backgroundColor: 'rgba(35, 32, 32, 1)',
          backgroundImage: 'radial-gradient(circle, rgb(159, 157, 157) 3px, transparent 1px)',
          backgroundSize: '20px 20px',
          backdropFilter: 'blur(10px)',
          backgroundBlendMode: 'overlay',
        },
      });
    }),
  ],
};