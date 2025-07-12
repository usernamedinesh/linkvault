import { NavLink } from "react-router";

function Sidebar() {
    return(
        <> 
            <nav className = "h-[100vh] w-[18vw] bg-black font-white text-white ">
                <NavLink to="/login"> Login </ NavLink>
                <NavLink to="/signup"> Signup </ NavLink>
                <NavLink to="/signup"> Logout </ NavLink>
            </nav>
        </>
    )
}

export default Sidebar;
