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
        <header> 
            <nav className="navHeader">
            <SidebarHeader
                onToggleSidebar={toggleSidebar}
                isOpen={isSidebarOpen}
            />
            <div>
                <NavLink className={"navLink"} to={"/"}>
                    <img className={"logo"} src="./logo.svg" />
                </NavLink>
            </div>


            {isLoggedIn ? (
                <>
                    <NavLink className={"linkEntry"} to={"/newEntry"}>
                        Nuevo Post
                    </NavLink>

                    <button className={"sessionClose"} onClick={onLogout}>
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <>
                    <NavLink className={"linkLogin"} to={"/login"}>
                        Login
                    </NavLink>

                    <NavLink className={"linkRegister"} to={"/register"}>
                        Register
                    </NavLink>
                </>
            )}
        </nav>
        </header>
       
    );
};

export default Header;
