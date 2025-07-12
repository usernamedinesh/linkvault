//how to show sidebar here 

import Sidebar from "../components/Sidebar";
import {useState} from "react";

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const clicked = () => {
        return <Sidebar />
    }
    const handleMouseMove = (e) => {
        if (e.clientX <= 1){
            setIsSidebarOpen(true);
        } 
    }
    const handleMouseLeave = () => {
        setIsSidebarOpen(false);
    }

    return (
<div
            onMouseMove={handleMouseMove}
            style={{ height: "100vh" }}
            className="flex gap-0 bg-gray-100"
        >
            {/* Sidebar Container */}
            <div
                onMouseLeave={handleMouseLeave}
                className={`transition-all duration-500 ease-in-out
                    ${isSidebarOpen ? 'w-64 opacity-100 scale-100' : 'w-0 opacity-0 scale-95'}
                    overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900
                    text-white shadow-lg rounded-r-md transform
                    backdrop-blur-sm`}
                style={{
                    transitionProperty: 'width, opacity, transform',
                }}
            >
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-800">Home page</h1>
                <p className="mt-2 text-gray-500">Sidebar will show here smoothly and cleanly.</p>
            </div>
        </div>
    )
}

export default Home;
