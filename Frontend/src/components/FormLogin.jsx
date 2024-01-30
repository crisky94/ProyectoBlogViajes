import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
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
            onLogin({ usuario, token });
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
        }
    };

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Iniciar Sesión</button>
                </div>
                <Link to={"/user/recover-password"}>
                    <p>Recupar contraseña</p>
                </Link>
            </form>
        </>
    );
};

export default Login;
