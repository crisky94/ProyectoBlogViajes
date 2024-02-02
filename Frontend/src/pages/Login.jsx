import FormLogin from "../components/FormLogin";
import { useState } from "react";
import "../styles/LoginStyles.css";

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = ({ usuario, token }) => {
         setLoggedInUser({ usuario, token });
    };

    return (
        <div className="card">
            <h1>Logeado!</h1>
            {loggedInUser ? (
                <p>Bienvenido</p>
            ) : (
                <FormLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Login;
