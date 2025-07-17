import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import './index.css'
import router from "./routes";
import App from './App.tsx'
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <SidebarProvider>
            <AuthProvider>
            <App />
            <RouterProvider router = { router } /> 
            </AuthProvider>
            </SidebarProvider>
        </ThemeProvider>
    </StrictMode>,
)
