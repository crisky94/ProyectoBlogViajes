import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
    useEffect(() => {
        console.log("Estado de autenticación cambiado:", isLoggedIn);
    }, [isLoggedIn]);
    return (
        <nav>
            <NavLink to={"/"}>Home</NavLink>
            {"  |  "}
            {isLoggedIn ? (
                <>
                    <NavLink to={"/newEntry"}>Nuevo post</NavLink>
                    {"  |  "}
                    <button onClick={onLogout}>Cerrar Sesión</button>
                </>
            ) : (
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                    {"  |  "}
                    <NavLink to={"/register"}>Register</NavLink>
                </>
            )}
        </nav>
    );
};

export default Header;
