import { useEffect, useState } from "react";
import "../styles/entries.css";
import { Link } from "react-router-dom";
import DeleteEntry from "../components/DeleteEntry";

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

    return (
        <main>
            <h1>Las recomendaciones de nuestros viajeros 👇🏽</h1>
            <ul>
                {data.map((entry) => (
                    <li key={entry.id}>
                        <Link to={`entries/${entry.id}`}>
                            <h2>{entry.title}</h2>
                        </Link>

                        {entry.photos &&
                            entry.photos.split(",").map((photoName, index) => (
                                <div key={index}>
                                    <img
                                        src={`${
                                            import.meta.env.VITE_API_URL
                                        }/uploads/${photoName}`}
                                        alt=""
                                    />
                                </div>
                            ))}

                        <p>
                            {entry.username} | {entry.sortDescription}
                        </p>
                        <p>
                            Creado el{" "}
                            {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                        <Link
                            to={`${import.meta.env.VITE_API_URL}/entries/${
                                entry.id
                            }/votes`}
                        >
                            <span className="material-symbols-outlined">
                                favorite
                            </span>
                        </Link>
                        <p>{entry.voteCount} Me gusta</p>
                        <DeleteEntry id={entry.id} />
                    </li>
                ))}
            </ul>
            {error && <p>{error}</p>}
        </main>
    );
}

export default Entries;
