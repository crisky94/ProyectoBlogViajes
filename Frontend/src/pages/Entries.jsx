import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteEntryService from "../services/deleteEntryService";
import "../styles/entries.css";
import { Link } from "react-router-dom";

function Entries({ removeTweet }) {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { VITE_API_URL } = import.meta.env;
                const response = await fetch(`${VITE_API_URL}entries`);

                if (!response.ok) {
                    throw new Error(
                        "Server response was not ok " + response.statusText
                    );
                }

                const body = await response.json();

                setData(body.data.entries);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);
    const deleteTweet = async (id) => {
        try {
            await deleteEntryService(id);

            if (removeTweet) {
                removeTweet(id);
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <main>
            <h1>Las recomendaciones de nuestros viajeros 👇🏽</h1>
            <ul>
                {Object.values(data).map(
                    (
                        {
                            title,
                            sortDescription,
                            photos,
                            createdAt,
                            username,
                            value,
                            entryId,
                        },
                        id
                    ) => (
                        <li key={id}>
                            <Link to={`/entries/${entryId}`}>
                                <h2>{title}</h2>
                            </Link>
                            {photos ? (
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_URL
                                    }uploads/${photos[id].name}`}
                                    alt=""
                                />
                            ) : (
                                "La entrada no contiene imagenes todavía"
                            )}

                            <p>
                                {username}
                                {" | "}
                                {sortDescription}
                            </p>
                            <p>
                                Creado el{" "}
                                {new Date(createdAt).toLocaleDateString()}
                            </p>
                            <Link
                                to={`${
                                    import.meta.env.VITE_API_URL
                                }entries/${entryId}/votes`}
                            >
                                <span className="material-symbols-outlined">
                                    favorite
                                </span>
                            </Link>
                            <p>{value} Me gusta</p>
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure?"))
                                        deleteTweet({ id });
                                }}
                            >
                                Borrar Publicacion
                            </button>
                        </li>
                    )
                )}
            </ul>
            {error ? <p>{error}</p> : ""}
        </main>
    );
}

export default Entries;
