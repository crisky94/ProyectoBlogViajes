import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
    const [entriesPlace, setEntriesPlace] = useState("");
    const [entriesCategory, setEntriesCategory] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleInputChangePlace = (e) => {
        setEntriesPlace(e.target.value);
    };

    const handleInputChangeCategory = (e) => {
        setEntriesCategory(e.target.value);
    };

    const handleSearch = () => {
        if (entriesPlace && entriesCategory) {
            navigate(
                `/entries/place/${entriesPlace}/category/${entriesCategory}`
            );
        } else if (entriesPlace) {
            navigate(`/entries/place/${entriesPlace}`);
        } else if (entriesCategory) {
            navigate(`/entries/category/${entriesCategory}`);
        } else {
            console.log("Por favor, ingresa al menos un criterio de búsqueda.");
        }
    };

    const handleOrderByVotes = () => {
        navigate("/OrderByVotes");
    };
    const handleOrderByDate = () => {
        navigate("/OrderByDate");
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isCollapsed ? (
                    <img className="menu-btn-col" src="/menu.png" />
                ) : (
                    <img className="menu-btn-col1" src="/menu.png" />
                )}
            </button>
            <ul className="menu">
                <section className="menu-filtar">
                    <h2>Buscar por:</h2>
                    <li className="buscar-lugar">
                        <h2>Lugar</h2>
                        <input
                            type="text"
                            placeholder="Introduce un destino..."
                            value={entriesPlace}
                            onChange={handleInputChangePlace}
                        />
                    </li>
                    <li className="buscar-categoria">
                        <h2>Categoría</h2>
                        <select
                            value={entriesCategory}
                            onChange={handleInputChangeCategory}
                        >
                            <option value=""></option>
                            <option value="Aventura">Aventura</option>
                            <option value="Gastronomia">Gastronomía</option>
                            <option value="Cultura">Cultura</option>
                            <option value="Turismo">Turismo</option>
                        </select>
                    </li>
                    <li>
                        <button
                            className="button-sidebar"
                            onClick={handleSearch}
                        >
                            Buscar
                        </button>
                    </li>
                </section>
                <li className="ordenar-por-votos">
                    <h2>Ordenar por:</h2>
                    <button
                        className="button-sidebar"
                        onClick={handleOrderByVotes}
                    >
                        Votos
                    </button>
                    <button
                        className="button-sidebar"
                        onClick={handleOrderByDate}
                    >
                        Fecha
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
