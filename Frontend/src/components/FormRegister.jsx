import { useState } from "react";
import registerUserService from "../services/userRegisterSevice";
import { Link } from "react-router-dom";

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
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <input type="submit" value="Enviar" />
            </div>
            {rta.status == "ok" ? (
                <>
                    <p>{rta.message}</p>
                    <Link to={"/login"}>
                        <button>Login</button>
                    </Link>
                </>
            ) : (
                ""
            )}
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterForm;
