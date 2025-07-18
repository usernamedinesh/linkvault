import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

// Create context with proper generic type
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to consume the context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

// ThemeProvider component with typed props
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    // Load from localStorage or default to dark
    const saved = localStorage.getItem("theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
