import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/sidebar.css";

const Sidebar = () => {
    const [entriesPlace, setEntriesPlace] = useState("");
    const [entriesCategory, setEntriesCategory] = useState("");
    const navigate = useNavigate();

    const handleInputChangePlace = (e) => {
        setEntriesPlace(e.target.value);
    };

    const handleInputChangeCategory = (e) => {
        setEntriesCategory(e.target.value);
    };

    const handleSearchPlace = () => {
        navigate(`/entries/place/${entriesPlace}`);
    };

    const handleSearchCategory = () => {
        navigate(`/entries/category/${entriesCategory}`);
    };

    const handleOrderByVotes = () => {
        navigate("/OrderByVotes");
    };

    return (
        <ul className="menu">
            <li className="buscar-lugar">
                <h2>Buscar por lugar</h2>
                <input
                    type="text"
                    placeholder="Enter place..."
                    value={entriesPlace}
                    onChange={handleInputChangePlace}
                />
                <button className="button-sidebar" onClick={handleSearchPlace}>
                    Search
                </button>
            </li>
            <li className="buscar-categoria">
                <h2>Buscar por categoria</h2>
                <input
                    type="text"
                    placeholder="Enter category..."
                    value={entriesCategory}
                    onChange={handleInputChangeCategory}
                />
                <button
                    className="button-sidebar"
                    onClick={handleSearchCategory}
                >
                    Search
                </button>
            </li>
            <li className="ordenar-por-votos">
                <h2>Ordenar por votos</h2>
                <button className="button-sidebar" onClick={handleOrderByVotes}>
                    Order by Votes
                </button>
            </li>
        </ul>
    );
};

export default Sidebar;
