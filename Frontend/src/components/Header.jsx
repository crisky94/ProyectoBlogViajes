import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import SidebarHeader from "./SideBarHeader";

import dom from "../logo/dom.png";
import luna from "../logo/luna-creciente.png";

const Header = ({ isLoggedIn, onLogout, theme, toggleTheme }) => {
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
                theme={theme}
                onToggleSidebar={toggleSidebar}
                isOpen={isSidebarOpen}
            />

            <button className="theme-toggle-button" onClick={toggleTheme}>
                {theme === "light" ? (
                    <img className="logo-hed" src={dom} />
                ) : (
                    <img className="logo-hed" src={luna} />
                )}
            </button>

            <NavLink className={"navLink"} to={"/"}>
                <img className={"logo"} src="/logo.svg" />
            </NavLink>

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
    );
};

export default Header;
