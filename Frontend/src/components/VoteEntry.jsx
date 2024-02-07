import voteEntryService from "../services/voteEntryService";
import { useState } from "react";

const VoteEntry = ({ id }) => {
    const [error, setError] = useState("");
    const handleVote = async () => {
        try {
            const token = localStorage.getItem("token");
            await voteEntryService({ token, id });
            console.log("Publicación votada!");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <button className="like-button" onClick={handleVote}>
                <span className="material-symbols-outlined">favorite</span>
            </button>
        </div>
    );
};
export default VoteEntry;
