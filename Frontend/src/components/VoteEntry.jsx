import voteEntryService from "../services/voteEntryService";
import deleteEntryService from "../services/deleteEntryService";
import { useState } from "react";

const VoteEntry = ({ id }) => {
    const [error, setError] = useState("");
    const handleVote = async () => {
        try {
            const token = localStorage.getItem("token");
            await voteEntryService({ token, id });
            console.log("Publicación votada!");
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await deleteEntryService({ id, token });

            console.log("Like borrada con exito!");

            window.location.reload();
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
