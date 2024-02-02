import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderByDate = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/entries/order/ordered-by-date`
                );
                const data = await response.json();
                setEntries(data.data.entries);
            } catch (error) {
                console.error("Error fetching entries:", error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div>
            <h2>Entradas ordenadas por fecha</h2>
            <ul>
                {entries.map((entry) => (
                    <li className="li" key={entry.id}>
                        <section className="entry-info">
                            <h3 className="entry-title">
                                <Link to={`/entries/${entry.id}`}>
                                    <h2>{entry.title}</h2>
                                </Link>
                            </h3>
                            <p className="entry-text">{entry.text}</p>
                        </section>
                        {entry.photos.map((photoName, index) => (
                            <div key={index}>
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }/uploads/${photoName.name}`}
                                    alt=""
                                />
                            </div>
                        ))}

                        <ul className="extras">
                            <li className="extras-li">
                                <strong>País en el que se encuentra:</strong>{" "}
                                {entry.place}
                            </li>
                            <li className="extras-li">
                                <strong>
                                    Categoría en la que se encuentra:
                                </strong>{" "}
                                {entry.category}
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderByDate;
