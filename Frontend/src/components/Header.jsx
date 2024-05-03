import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import SidebarHeader from "./SideBarHeader";

import dom from "../logo/dom.png";
import luna from "../logo/luna-creciente.png";

const Header = ({ isLoggedIn, onLogout, theme, toggleTheme }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(isSidebarOpen);
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
                    <img className="logo-hed" src={luna} />
                ) : (
                    <img className="logo-hed" src={dom} />
                )}
            </button>

            <NavLink className={"navLink"} to={"/"}>
                {theme === "light" ? (
                    <img className={"logo"} src="/logo.svg" />
                ) : (
                    <img className="logo" src="/logo-dark.png" />
                )}
            </NavLink>

            {isLoggedIn ? (
                <>
                    <NavLink className={"linkEntry"} to={"/newEntry"}>
                        Crear Publicación
                    </NavLink>

                    <button className={"sessionClose"} onClick={onLogout}>
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <>
                    <NavLink className={"linkLogin"} to={"/login"}>
                        Iniciar Sesión
                    </NavLink>

                    <NavLink className={"linkRegister"} to={"/register"}>
                        Registro
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default Header;
