import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebarHeader.css";

const SidebarHeader = ({ theme }) => {
    const [entriesPlace, setEntriesPlace] = useState("");
    const [entriesCategory, setEntriesCategory] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChangePlace = (e) => {
        setEntriesPlace(e.target.value);
        toggleSidebar();
    };

    const handleInputChangeCategory = (e) => {
        setEntriesCategory(e.target.value);
        toggleSidebar();
    };

    const handleSearch = () => {
        if (entriesPlace || entriesCategory) {
            if (entriesPlace && entriesCategory) {
                navigate(
                    `/entries/place/${entriesPlace}/category/${entriesCategory}`,
                );
            } else if (entriesPlace) {
                navigate(`/entries/place/${entriesPlace}`);
            } else {
                navigate(`/entries/category/${entriesCategory}`);
            }
            toggleSidebar();
        } else {
            setErrorMessage(
                "Por favor, ingresa al menos un criterio de búsqueda.",
            );
        }
    };

    const handleOrderByVotes = () => {
        navigate("/OrderByVotes");
        toggleSidebar();
    };

    const handleOrderByDate = () => {
        navigate("/OrderByDate");
        toggleSidebar();
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const clearErrorMessage = () => {
        setErrorMessage("");
    };

    return (
        <div className={`sidebar-header ${isCollapsed ? "collapsed" : ""}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isCollapsed ? (
                    theme === "light" ? (
                        <img
                            className="menu-btn-col"
                            src="/image (4).png"
                            alt="Menu collapsed"
                        />
                    ) : (
                        <img
                            className="menu-btn-col"
                            src="/image (2).png"
                            alt="Menu collapsed dark"
                        />
                    )
                ) : theme === "light" ? (
                    <img
                        className="menu-btn-col1"
                        src="/image (4).png"
                        alt="Menu expanded"
                    />
                ) : (
                    <img
                        className="menu-btn-col1"
                        src="/image (2).png"
                        alt="Menu expanded dark"
                    />
                )}
            </button>
            <ul className="menu-header">
                <section className="menu-filtar">
                    <h2 className="h2-hed-sdb">Buscar por:</h2>
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
                            className="select-sidebar-ctg"
                            value={entriesCategory}
                            onChange={handleInputChangeCategory}
                        >
                            <option value="">Selecciona categoría</option>
                            <option value="Aventura">Aventura</option>
                            <option value="Single">Single</option>
                            <option value="Parejas">Parejas</option>
                            <option value="Familia">Familia</option>
                            <option value="Cultura">Cultura</option>
                            <option value="Gastronomía">Gastronomía</option>
                            <option value="Playa">Playa</option>
                            <option value="Montaña">Montaña</option>
                            <option value="Naturaleza">Naturaleza</option>
                        </select>
                    </li>
                    <li>
                        <button
                            className="button-sidebar"
                            onClick={handleSearch}
                        >
                            Buscar
                        </button>
                        {errorMessage && (
                            <p className="error-message">
                                <button
                                    className="close-error-button"
                                    onClick={clearErrorMessage}
                                >
                                    x
                                </button>
                                {errorMessage}
                            </p>
                        )}
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
                        Más antiguos
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SidebarHeader;
