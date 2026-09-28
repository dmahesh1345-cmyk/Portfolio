import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

const user = {
  name: "Dasari Mahesh",
  email: "dasari.mahesh@example.com",
  city: "Hyderabad",
  role: ".NET Developer",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, user }}>
      {children}
    </ThemeContext.Provider>
  );
}