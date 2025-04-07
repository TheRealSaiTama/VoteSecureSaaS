import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Check if dark mode is stored in local storage, otherwise check for user's system preference
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('voteSecureTheme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    
    // If no stored preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  // Update document with theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('voteSecureTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('voteSecureTheme', 'light');
    }
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Set a specific theme
  const setTheme = (isDark) => {
    setIsDarkMode(isDark);
  };

  // Context value
  const value = {
    isDarkMode,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
