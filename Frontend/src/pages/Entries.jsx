import { useEffect, useState } from "react";
import "../styles/entries.css";
import { Link } from "react-router-dom";
import DeleteEntry from "../components/DeleteEntry";
import VoteEntry from "../components/VoteEntry";

function Entries() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/entries`,
                );

                if (!response.ok) {
                    throw new Error(
                        `Server response was not ok. Status: ${response.status}, ${response.statusText}`,
                    );
                }

                const body = await response.json();

                setData(body.data.entries);
            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
            }
        }

        fetchData();
    }, []);

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
            <h1>Las recomendaciones de nuestros viajeros 👇🏽</h1>
            {data.length === 0 ? (
                <>
                    <p>
                        Todavía no existen recomendaciones. ¿Quieres subir una?
                    </p>
                    <Link to={"/newEntry"}>
                        <button className="boton-ne">Nueva Entrada</button>
                    </Link>
                </>
            ) : (
                <ul className="entries-list">
                    {data.map((entry) => (
                        <li key={entry.id} className="card-container">
                            {entry.photos &&
                                entry.photos
                                    .split(",")
                                    .map((photoName, index) => (
                                        <div key={index}>
                                            <img
                                                className="picture"
                                                src={`${
                                                    import.meta.env.VITE_API_URL
                                                }/uploads/${photoName}`}
                                                alt="Imágen del viaje"
                                            />
                                        </div>
                                    ))}

                            <Link to={`entries/${entry.id}`}>
                                <h2 className="entry-title">{entry.title}</h2>
                            </Link>
                            <p>{entry.place}</p>
                            <p className="user-description">
                                {entry.sortDescription}
                            </p>
                            <p className="created-at">
                                Publicado el{" "}
                                {new Date(entry.createdAt).toLocaleDateString()}{" "}
                                por ({entry.username})
                            </p>

                            <div className="card-footer">
                                {currentUser !== entry.userId ? (
                                    <VoteEntry id={entry.id} />
                                ) : null}
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
        </main>
    );
}

export default Entries;
