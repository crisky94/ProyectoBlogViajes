import { useState, useEffect } from "react";

const OrderByVotes = () => {
    const [entries, setEntries] = useState([]);

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
            }
        };

        fetchEntries();
    }, []);

    return (
        <div>
            <h2>Entries Ordered by Votes</h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        {entry.title} - Votes: {entry.voteCount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderByVotes;
