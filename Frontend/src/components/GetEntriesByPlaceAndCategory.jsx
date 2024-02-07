import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/entries.css";
import DeleteEntry from "./DeleteEntry";
import VoteEntry from "./VoteEntry";

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
        <main className="cards-container">
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
                                categoria. ¿Quieres subir una?
                            </p>
                            <Link to={"/newEntry"}>
                                <button className="boton-ne">
                                    Nueva Entrada
                                </button>
                            </Link>
                        </>
                    ) : (
                        <ul className="entries-list">
                            {entries.map((entry) => (
                                <li key={entry.id} className="card-container">
                                    {entry.photos.map((photoName, index) => (
                                        <div key={index}>
                                            <img
                                                className="picture"
                                                src={`${
                                                    import.meta.env.VITE_API_URL
                                                }/uploads/${photoName.name}`}
                                                alt=""
                                            />
                                        </div>
                                    ))}
                                    <Link to={`entries/${entry.id}`}>
                                        <h2 className="entry-title">
                                            {entry.title}
                                        </h2>
                                    </Link>
                                    <p className="user-description">
                                        {entry.username} |{" "}
                                        {entry.sortDescription}
                                    </p>
                                    <p className="created-at">
                                        Publicado el{" "}
                                        {new Date(
                                            entry.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                    <div className="card-footer">
                                        <VoteEntry id={entry.id} />
                                        <p className="votes">
                                            {entry.voteCount} Me gusta
                                        </p>
                                        <DeleteEntry id={entry.id} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </main>
    );
};

export default GetEntriesByPlaceAndCategory;
