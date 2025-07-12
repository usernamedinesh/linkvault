import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import './index.css'
import router from "./routes";
import App from './App.tsx'
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <App />
            <RouterProvider router = { router } /> 
        </ThemeProvider>
    </StrictMode>,
)
