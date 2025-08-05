import { createContext, useContext, useState, useEffect } from "react";

// ❌ Not exported outside — internal only
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    const html = document.documentElement;
    html.setAttribute("data-theme", newTheme ? "dark" : "light");
  };

  // 🔁 Apply theme on initial load
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Use this in components to get theme state and toggle function
export const useTheme = () => useContext(ThemeContext);
