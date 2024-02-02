import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginStyles.css";

const FormLogin = ({ onLogin }) => {
    const navigate = useNavigate();
    const url = `${import.meta.env.VITE_API_URL}/users/login`;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const { usuario, token } = await response.json();

            localStorage.setItem("token", token);

            onLogin({ usuario, token });

            navigate("/");
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
        }
    };

    return (
        <>
            {" "}
            <div className="card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                            />
                        </label>
                    </div>
                    <label>
                        <div className="form-group">
                            Contraseña:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                            />
                        </div>
                    </label>
                    <div>
                        <button type="submit" className="btn-login">
                            Iniciar Sesión
                        </button>
                    </div>
                    <Link to={"/user/recover-password"}>
                        <p>Recuperar contraseña</p>
                    </Link>
                </form>
            </div>
        </>
    );
};

export default FormLogin;
