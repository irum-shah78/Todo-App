import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;


// import type { Config } from "tailwindcss";
// import themeColors  from "./src/constants/ThemeColors"; // Import colors from constants

// // Generate safelist from color constants
// const safelist = Object.keys(themeColors).flatMap((color) => [
//   `bg-${color}`,
//   `text-${color}`,
//   `border-${color}`,
//   `placeholder-${color}`,
// ]);

// const config: Config = {
//   safelist, // Safelist is added
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         vintageGardenPrimary: "#2D4659",
//         vintageGardenBackground: "#FDFBDA",
//         vintageGardenAccent: "#819F7F",
//         cosmicSymphonyPrimary: "#F0EB8D",
//         cosmicSymphonyBackground: "#413543",
//         cosmicSymphonyAccent: "#8F43EE",
//         rusticCharmPrimary: "#EA5455",
//         rusticCharmBackground: "#F9F5EB",
//         rusticCharmAccent: "#E4BD7D",
//         sunsetSerenadePrimary: "#210062",
//         sunsetSerenadeBackground: "#009FBD",
//         sunsetSerenadeAccent: "#77037B",
//         industrialChicPrimary: "#F45050",
//         industrialChicBackground: "#F0F0F0",
//         industrialChicAccent: "#F9D949",
//         blackoutNeutralsPrimary: "#F3EFE0",
//         blackoutNeutralsBackground: "#222222",
//         blackoutNeutralsAccent: "#22A39F",
//         vibrantSpectrumPrimary: "#4A0E5C",
//         vibrantSpectrumBackground: "#CCF0C3",
//         vibrantSpectrumAccent: "#BCA3CA",
//         coastalSunrisePrimary: "#005874",
//         coastalSunriseBackground: "#E6E6D4",
//         coastalSunriseAccent: "#FFBE00",
//         oceanicSerenityPrimary: "#CBE4DE",
//         oceanicSerenityBackground: "#2C3333",
//         oceanicSerenityAccent: "#2E4F4F",
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//         "dotted-pattern":
//           "radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 5px)", 
//       },

//       // backgroundSize: {
//       //   "dotted-size": "20px 20px",
//       // },
//       // fontFamily: {
//       //   stint: ["Stint_Ultra_Condensed"],
//       // },
//     },
//   },
//   plugins: [],
// };

// export default config;
