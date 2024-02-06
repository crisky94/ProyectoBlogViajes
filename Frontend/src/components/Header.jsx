import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css"

const Header = ({ isLoggedIn, onLogout }) => {
    useEffect(() => {
        console.log("Estado de autenticación cambiado:", isLoggedIn);
    }, [isLoggedIn]);
    return (
        
            <nav className="navHeader">
                <NavLink className={"navLink"} to={"/"}>Home</NavLink>
               
                {isLoggedIn ? (
                    <>
                        <NavLink className={"navLink"}  to={"/newEntry"}>Nuevo post</NavLink>
                        
                        <button className={"sessionClose"} onClick={onLogout}>Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <NavLink className={"navLink"}  to={"/login"}>Login</NavLink>
                       
                        <NavLink className={"navLink"}  to={"/register"}>Register</NavLink>
                    </>
                )}
            </nav>
           

    );
};

export default Header;
