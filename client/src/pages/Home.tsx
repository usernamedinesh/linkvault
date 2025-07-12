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
        <div onMouseMove = {handleMouseMove} style = {{height:"100vh"}} className="flex gap-30">
            <div onMouseLeave = { handleMouseLeave} >
                { isSidebarOpen && <Sidebar /> }
            </div>
            <div>
                <h1>Home page </h1>
                <h1>need to show sidebar here  </h1>

            </div>
        </div>
    )
}

export default Home;
