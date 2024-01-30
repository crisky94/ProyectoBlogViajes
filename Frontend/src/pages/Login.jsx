import FormLogin from "../components/FormLogin";
import { useState } from "react";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = ({ usuario, token }) => {
        setLoggedInUser({ usuario, token });
    };

    return (
        <div>
            <h1>Logeado!</h1>
            {loggedInUser ? (
                <p>Bienvenido</p>
            ) : (
                <FormLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;