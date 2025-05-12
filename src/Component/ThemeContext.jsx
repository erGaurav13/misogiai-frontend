import React, { createContext, useState, useContext } from "react";

// Create a context for theme
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

// Light and dark themes
const lightTheme = {
  background: "#ffffff",
  color: "#000000",
  buttonBg: "#884ebe",
  buttonHover: "#7a3ca6",
};

const darkTheme = {
  background: "#2e2e2e",
  color: "#ffffff",
  buttonBg: "#6a2a8c",
  buttonHover: "#884ebe",
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme: isDarkMode ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
