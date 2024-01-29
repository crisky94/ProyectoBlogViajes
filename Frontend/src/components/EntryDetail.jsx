import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const getEntryByIdService = async (entryId) => {
    const url = `${import.meta.env.VITE_API_URL}entries/${entryId}`;

    const response = await fetch(url);

    const json = await response.json();

    return json;
};

const useEntry = (entryId) => {
    const [entry, setEntry] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getEntryById = async () => {
            try {
                const entry = await getEntryByIdService(entryId);
                setEntry(entry.data);
            } catch (error) {
                setError(error);
            }
        };

        getEntryById();
    }, [entryId]);

    return { entry, error };
};

const EntryDetail = () => {
    const { entryId } = useParams();

    const { entry, error } = useEntry(entryId);
    console.log(entryId);

    const { VITE_API_URL } = import.meta.env;

    return entry ? (
        <div>
            <article key={entry.post.id}>
                <h2> {entry.post.title}</h2>
                <img
                    src={`${VITE_API_URL}entries/uploads/${entry.photos}`}
                    alt="Imágen del viaje"
                />
                <p>
                    {entry.post.username}
                    {" | "}
                    {entry.post.sortDescription}
                </p>
                <p>{entry.post.text}</p>
                <p>
                    Creado el{" "}
                    {new Date(entry.post.createdAt).toLocaleDateString()}
                </p>
                <Link to={`entries/${entryId}/votes`}>
                    <span className="material-symbols-outlined">favorite</span>
                </Link>

                <p>{entry.post.value} Me gusta</p>

                {error ? <p>{error}</p> : ""}
            </article>
        </div>
    ) : (
        <p>Cargando....</p>
    );
};

export default EntryDetail;
