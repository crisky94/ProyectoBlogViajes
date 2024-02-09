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
                    `${import.meta.env.VITE_API_URL}/entries`
                );

                if (!response.ok) {
                    throw new Error(
                        `Server response was not ok. Status: ${response.status}, ${response.statusText}`
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
            <ul className="entries-list">
                {data.map((entry) => (
                    <li key={entry.id} className="card-container">
                        {entry.photos &&
                            entry.photos.split(",").map((photoName, index) => (
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
                        <p className="user-description">
                            {entry.username} | {entry.sortDescription}
                        </p>
                        <p className="created-at">
                            Publicado el{" "}
                            {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                        <div className="card-footer">
                            <VoteEntry id={entry.id} />
                            <p className="votes">{entry.voteCount} Me gusta</p>
                            {currentUser === entry.userId ? (
                                <DeleteEntry id={entry.id} />
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
            {error && <p>{error}</p>}
        </main>
    );
}

export default Entries;
