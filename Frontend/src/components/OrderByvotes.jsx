import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteEntry from "./DeleteEntry";
import VoteEntry from "./VoteEntry";

const OrderByVotes = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/entries/order/ordered-by-votes`
                );
                const data = await response.json();
                setEntries(data.data.entries);
            } catch (error) {
                console.error("Error fetching entries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <div>
                        <h2 className="title">
                            Recomendaciones ordenadas por num. de votos
                        </h2>
                    </div>

                    <ul className="entries-list">
                        {entries.map((entry) => (
                            <li key={entry.id} className="card-container">
                                {entry.photos &&
                                    entry.photos
                                        .split(",")
                                        .map((photoName, index) => (
                                            <div key={index}>
                                                <img
                                                    className="picture"
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_URL
                                                    }/uploads/${photoName}`}
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
                                    {entry.username} | {entry.sortDescription}
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
                </div>
            )}
        </main>
    );
};

export default OrderByVotes;
