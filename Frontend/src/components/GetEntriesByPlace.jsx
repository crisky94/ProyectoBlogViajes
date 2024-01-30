import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GetEntriesByPlace = ({ entriesPlace }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/entries/place/${entriesPlace}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }

                const body = await res.json();

                setData(body.data.post);
            } catch (error) {
                console.error("Error fetching entries:", error);
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, [entriesPlace]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <div className="title">
                        <h2>Recomendaciones en: {entriesPlace}</h2>
                    </div>
                    {data.length === 0 ? (
                        <>
                            <p>
                                Todavía no existen recomendaciones en este país.
                                ¿Quieres subir una?
                            </p>
                            <Link to={"/newEntry"}>
                                <button className="boton-ne">
                                    Nueva Entrada
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="ep-main-container">
                            <ul className="main">
                                {data.map((entry) => (
                                    <li className="li" key={entry.id}>
                                        <section className="entry-info">
                                            <h3 className="entry-title">
                                                <Link
                                                    to={`/entries/${entry.id}`}
                                                >
                                                    <h2>{entry.title}</h2>
                                                </Link>
                                            </h3>
                                            <p className="entry-text">
                                                {entry.text}
                                            </p>
                                        </section>

                                        {entry.photos.map(
                                            (photoName, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={`${
                                                            import.meta.env
                                                                .VITE_API_URL
                                                        }/uploads/${
                                                            photoName.name
                                                        }`}
                                                        alt=""
                                                    />
                                                </div>
                                            )
                                        )}

                                        <ul className="extras">
                                            <li className="extras-li">
                                                <strong>
                                                    País en el que se encuentra:
                                                </strong>{" "}
                                                {entry.place}
                                            </li>
                                            <li className="extras-li">
                                                <strong>
                                                    Categoría en la que se
                                                    encuentra:
                                                </strong>{" "}
                                                {entry.category}
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetEntriesByPlace;
