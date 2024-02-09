import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
// import Login from "./pages/Login";
import Register from "./pages/Register";
import EntriesByPlace from "./pages/EntriesByPlace";
import EntriesByCategory from "./pages/EntriesByCategory";
import EntryDetail from "./components/EntryDetail";
import OrderByVotes from "./components/OrderByvotes";
import FormLogin from "./components/FormLogin";
import GetEntriesByPlaceAndCategory from "./components/GetEntriesByPlaceAndCategory";
import OrderByDate from "./components/OrderByDate";

const App = () => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = ({ usuario, token }) => {
        setLoggedInUser({ usuario, token });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedInUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedInUser({
                token: token,
            });
        }
    }, []);

    return (
        <>
            <div className={`body ${theme}`}>
                <Header
                    theme={theme}
                    toggleTheme={toggleTheme}
                    isLoggedIn={!!loggedInUser}
                    onLogout={handleLogout}
                />
                <Routes>
                    <Route path="/newEntry" element={<NewEntry />} />
                    <Route
                        path="/"
                        element={
                            <Home theme={theme} toggleTheme={toggleTheme} />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/login"
                        element={<FormLogin onLogin={handleLogin} />}
                    />
                    <Route
                        path="/entries/place/:place/category/:category" // Nueva ruta para lugar y categoría
                        element={<GetEntriesByPlaceAndCategory />}
                    />
                    <Route
                        path="/entries/place/:entriesPlace"
                        element={<EntriesByPlace />}
                    />
                    <Route
                        path="/entries/category/:entriesCategory"
                        element={<EntriesByCategory />}
                    />
                    <Route path="/entries/:entryId" element={<EntryDetail />} />
                    <Route path="/OrderByvotes" element={<OrderByVotes />} />
                    <Route path="/OrderByDate" element={<OrderByDate />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
};

export default App;
