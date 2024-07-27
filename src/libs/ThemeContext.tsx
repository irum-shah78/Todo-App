'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import themes, { ThemeName } from '../constants/ThemeColors';

interface ThemeContextProps {
  themeName: ThemeName | null;
  setThemeName: (theme: ThemeName) => void;
  currentTheme: typeof themes[ThemeName] | null;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName | null>(null);
  const currentTheme = themeName ? themes[themeName] : null;

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty('--primary-color', currentTheme.primary);
      document.documentElement.style.setProperty('--background-color', currentTheme.background);
      document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
    }
  }, [currentTheme]);

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
