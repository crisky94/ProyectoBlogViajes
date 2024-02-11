import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            {/* {" "} */}
            {/* <div className="card"> */}
            <h2 className="title-rgs">Iniciar Sesión</h2>
            <div className="login-ctn">
                <form onSubmit={handleSubmit}>
                    <div className="contenedor-input">
                        <label>
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-register"
                        />
                    </div>
                    <div className="contenedor-input">
                        <label>
                            Contraseña <span className="required">*</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-register"
                        />
                    </div>
                    <div>
                        <button type="submit" className="rg-btn">
                            Iniciar Sesión
                        </button>
                    </div>
                    {/* <Link to={"/user/recover-password"}>
                        <p>Recuperar contraseña</p>
                    </Link> */}
                </form>
            </div>
            {/* </div> */}
        </>
    );
};

export default FormLogin;
