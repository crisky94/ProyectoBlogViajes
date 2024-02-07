import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import SidebarHeader from "./SideBarHeader";

const Header = ({ isLoggedIn, onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        console.log("Estado de autenticación cambiado:", isLoggedIn);
    }, [isLoggedIn]);
    return (
        <nav className="navHeader">
            <SidebarHeader
                onToggleSidebar={toggleSidebar}
                isOpen={isSidebarOpen}
            />
            <NavLink className={"navLink"} to={"/"}>
                Home
            </NavLink>

            {isLoggedIn ? (
                <>
                    <NavLink className={"navLink"} to={"/newEntry"}>
                        Nuevo post
                    </NavLink>

                    <button className="sessionClose" onClick={onLogout}>
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <>
                    <NavLink className={"navLink"} to={"/login"}>
                        Login
                    </NavLink>

                    <NavLink className={"navLink"} to={"/register"}>
                        Register
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default Header;
