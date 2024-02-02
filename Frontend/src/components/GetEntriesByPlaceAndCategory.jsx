import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const GetEntriesByPlaceAndCategory = () => {
    // const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { place, category } = useParams();

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/entries/place/${place}/category/${category}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }

                const data = await res.json();
                setEntries(data.data.post);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, [place, category]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <div className="title">
                        <h2>
                            Recomendaciones en la categoría: {entries.category}{" "}
                            y lugar: {entries.place}
                        </h2>
                    </div>

                    {entries.length === 0 ? (
                        <>
                            <p>
                                Todavía no existen recomendaciones en esta
                                categoría y lugar. ¿Quieres subir una?
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
                                {entries.map((entry) => (
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

export default GetEntriesByPlaceAndCategory;
