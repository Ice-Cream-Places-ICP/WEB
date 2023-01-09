import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const getIsMobile = () => {
    return isMobile;
  };

  return (
    <ThemeContext.Provider value={{ setIsMobile, getIsMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
