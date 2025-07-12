import { NavLink } from "react-router";

function Sidebar() {
    return(
        <> 
            <nav className = "h-[100vh] w-[18vw] bg-black font-white text-white ">
                <NavLink to="/login" className=" border-2 rounded-sm py-3 flex px-5"> Login </ NavLink>
                <NavLink to="/signup" className="border-2 rounded-sm py-3 flex px-5"> Signup </ NavLink>
                <NavLink to="/signup" className="border-2 rounded-sm py-3 flex px-5"> Logout </ NavLink>
            </nav>
        </>
    )
}

export default Sidebar;
