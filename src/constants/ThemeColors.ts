// const themes = {
//   "Vintage Garden": {
//     primary: "#2D4659",
//     background: "#FDFBDA",
//     accent: "#819F7F",
//   },
//   "Cosmic Symphony": {
//     primary: "#F0EB8D",
//     background: "#413543",
//     accent: "#8F43EE",
//   },
//   "Rustic Charm": {
//     primary: "#EA5455",
//     background: "#F9F5EB",
//     accent: "#E4BD7D",
//   },
//   "Sunset Serenade": {
//     primary: "#210062",
//     background: "#009FBD",
//     accent: "#77037B",
//   },
//   "Industrial Chic": {
//     primary: "#F45050",
//     background: "#F0F0F0",
//     accent: "#F9D949",
//   },
//   "Blackout Neutrals": {
//     primary: "#F3EFE0",
//     background: "#222222",
//     accent: "#22A39F",
//   },
//   "Vibrant Spectrum": {
//     primary: "#4A0E5C",
//     background: "#CCF0C3",
//     accent: "#BCA3CA",
//   },
//   "Coastal Sunrise": {
//     primary: "#005874",
//     background: "#E6E6D4",
//     accent: "#FFBE00",
//   },
//   "Oceanic Serenity": {
//     primary: "#CBE4DE",
//     background: "#2C3333",
//     accent: "#2E4F4F",
//   },
// };

// export default themes;


const themes = {
  "Vintage Garden": {
    primary: "#2D4659",
    background: "#FDFBDA",
    accent: "#819F7F",
  },
  "Cosmic Symphony": {
    primary: "#F0EB8D",
    background: "#413543",
    accent: "#8F43EE",
  },
  "Rustic Charm": {
    primary: "#EA5455",
    background: "#F9F5EB",
    accent: "#E4BD7D",
  },
  "Sunset Serenade": {
    primary: "#210062",
    background: "#009FBD",
    accent: "#77037B",
  },
  "Industrial Chic": {
    primary: "#F45050",
    background: "#F0F0F0",
    accent: "#F9D949",
  },
  "Blackout Neutrals": {
    primary: "#F3EFE0",
    background: "#222222",
    accent: "#22A39F",
  },
  "Vibrant Spectrum": {
    primary: "#4A0E5C",
    background: "#CCF0C3",
    accent: "#BCA3CA",
  },
  "Coastal Sunrise": {
    primary: "#005874",
    background: "#E6E6D4",
    accent: "#FFBE00",
  },
  "Oceanic Serenity": {
    primary: "#CBE4DE",
    background: "#2C3333",
    accent: "#2E4F4F",
  },
} as const;

export type ThemeName = keyof typeof themes;
export default themes;
