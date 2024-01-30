import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteEntry from "./deleteEntry";

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

    return entry ? (
        <div>
            <article key={entry.post.id}>
                <h2> {entry.post.title}</h2>

                {entry.post.photos &&
                    entry.post.photos.split(",").map((photoName, index) => (
                        <div key={index}>
                            <img
                                src={`${
                                    import.meta.env.VITE_API_URL
                                }uploads/${photoName}`}
                                alt="Imágen del viaje"
                            />
                        </div>
                    ))}

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

                <p>{entry.post.voteCount} Me gusta</p>
                <DeleteEntry id={entry.post.id}/>

                {error ? <p>{error}</p> : ""}
            </article>
        </div>
    ) : (
        <p>Cargando....</p>
    );
};

export default EntryDetail;
