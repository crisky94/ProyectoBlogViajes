import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/entries.css";
import DeleteEntry from "./DeleteEntry";
import VoteEntry from "./VoteEntry";

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

    const getCurrentUserId = () => {
        const token = localStorage.getItem("token");

        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));

            return payload.id;
        }
        return null;
    };

    const currentUser = getCurrentUserId();

    return (
        <main className="cards-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <div>
                        <h2 className="title">
                            Recomendaciones en: {entriesPlace}
                        </h2>
                    </div>

                    {data.length === 0 ? (
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
                            {data.map((entry) => (
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
                                    <Link to={`/entries/${entry.id}`}>
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
                                        {currentUser === entry.userId ? (
                                            <DeleteEntry id={entry.id} />
                                        ) : null}
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

export default GetEntriesByPlace;
