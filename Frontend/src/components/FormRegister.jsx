import { useState } from "react";
import registerUserService from "../services/userRegisterSevice";
import { Link } from "react-router-dom";
import "../styles/register.css";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [rta, setRta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const r = await registerUserService({ username, email, password });
            setRta(r);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <h2 className="title-rgs">Registrarse</h2>
            <div className="register-ctn">
                <form onSubmit={handleSubmit}>
                    <div className="contenedor-input">
                        <label>
                            Nombre de Usuario{" "}
                            <span className="required">*</span>
                        </label>
                        <input
                            className="input-register"
                            type="text"
                            name="username"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="contenedor-input">
                        <label>
                            Email<span className="required">*</span>
                        </label>

                        <input
                            className="input-register"
                            type="email"
                            name="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="contenedor-input">
                        <label>
                            Contraseña<span className="required">*</span>
                        </label>

                        <input
                            className="input-register"
                            type="password"
                            name="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="contenedor-input">
                        <label>
                            Confirmar Contraseña
                            <span className="required">*</span>
                        </label>
                        <input
                            className="input-register"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            className="rg-btn"
                            value="Registrarse"
                        />
                    </div>
                    {rta.status === "ok" ? (
                        <>
                            <p>{rta.message}</p>
                            <Link to={"/login"}>
                                <button className="rg-btn1">Login</button>
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
