import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteEntry from "./DeleteEntry";
import "../styles/entries.css";

const getEntryByIdService = async (entryId) => {
    const url = `${import.meta.env.VITE_API_URL}/entries/${entryId}`;

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

    const getCurrentUserId = () => {

        const token = localStorage.getItem('token');

        if (token) {

          const payload = JSON.parse(atob(token.split('.')[1]));
           
          return payload.id;
        }
        return null;
      };
      
     const currentUser = getCurrentUserId();
    
    return entry ? (
        <div className="cards-container">
            <h1>La recomendación de nuestros viajeros 👇🏽</h1>
            <article key={entry.post.id} className="card-container">
                {entry.post.photos &&
                    entry.post.photos.split(",").map((photoName, index) => (
                        <div key={index}>
                            <img
                                src={`${
                                    import.meta.env.VITE_API_URL
                                }/uploads/${photoName}`}
                                alt="Imágen del viaje"
                                className="picture"
                            />
                        </div>
                    ))}
                <h2 className="entry-title"> {entry.post.title}</h2>
                <p className="user-description">
                    {entry.post.username}
                    {" | "}
                    {entry.post.sortDescription}
                </p>
                <p className="entry-detail">{entry.post.text}</p>
                <p className="created-at">
                    Publicado el{" "}
                    {new Date(entry.post.createdAt).toLocaleDateString()}
                </p>
                <div className="card-footer">
                    <Link to={`entries/${entryId}/votes`}>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    </Link>

                    <p className="votes">{entry.post.voteCount} Me gusta</p>
                    {
                        currentUser === entry.post.userId ? 
                        (<DeleteEntry id={entry.post.id} />)
                        :
                        null
                    }
                    
                    
                </div>
                {error ? <p>{error}</p> : ""}
            </article>
        </div>
    ) : (
        <p>Cargando....</p>
    );
};

export default EntryDetail;
