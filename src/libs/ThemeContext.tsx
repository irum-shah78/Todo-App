// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import themes from '../constants/ThemeColors';

// interface ThemeContextProps {
//   themeName: keyof typeof themes;
//   setThemeName: (theme: keyof typeof themes) => void;
//   currentTheme: typeof themes[keyof typeof themes];
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [themeName, setThemeName] = useState<keyof typeof themes>('Vintage Garden');
//   const currentTheme = themes[themeName];

//   return (
//     <ThemeContext.Provider value={{ themeName, setThemeName, currentTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = (): ThemeContextProps => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };


// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import themes from '../constants/ThemeColors';

// interface ThemeContextProps {
//   themeName: keyof typeof themes;
//   setThemeName: (theme: keyof typeof themes) => void;
//   currentTheme: typeof themes[keyof typeof themes];
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [themeName, setThemeName] = useState<keyof typeof themes>('Vintage Garden');
//   const currentTheme = themes[themeName];

//   return (
//     <ThemeContext.Provider value={{ themeName, setThemeName, currentTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = (): ThemeContextProps => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     console.error('useTheme must be used within a ThemeProvider');
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };


// // src/libs/ThemeContext.tsx
// "use client"; // Add this directive to ensure this file is treated as a client component

// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import themes from '../constants/ThemeColors';

// interface ThemeContextProps {
//   themeName: keyof typeof themes;
//   setThemeName: (theme: keyof typeof themes) => void;
//   currentTheme: typeof themes[keyof typeof themes];
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [themeName, setThemeName] = useState<keyof typeof themes>('Vintage Garden');
//   const currentTheme = themes[themeName];

//   return (
//     <ThemeContext.Provider value={{ themeName, setThemeName, currentTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = (): ThemeContextProps => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     console.error('useTheme must be used within a ThemeProvider');
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };


"use client"; // Add this directive to ensure this file is treated as a client component

import React, { createContext, useContext, useState, ReactNode } from 'react';
import themes from '../constants/ThemeColors';

interface ThemeContextProps {
  themeName: keyof typeof themes | null;
  setThemeName: (theme: keyof typeof themes) => void;
  currentTheme: typeof themes[keyof typeof themes] | null;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<keyof typeof themes | null>(null);
  const currentTheme = themeName ? themes[themeName] : null;

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('useTheme must be used within a ThemeProvider');
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
