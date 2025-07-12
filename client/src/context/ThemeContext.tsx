import { createContext, useContext, useState, useEffect } from "react";

//create context
const ThemeContext  = createContext();

//export a custom hook
export const useTheme = () => useContext(ThemeContext);

//Provide a component
export function ThemeProvider ({children}) {
    const [theme, setTheme] = useState(() =>{
        //Load from localstorage or defualt dark
        return localStorage.getItem("theme") || "dark";
    });

    //whenever theme changes update the body or localStorage 
    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    },[theme]);

    const toggleTheme = () =>  setTheme(t => (t =="light" ? "dark" : "light"));
    return (
        <ThemeContext.Provider value = {{theme, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    )
}
