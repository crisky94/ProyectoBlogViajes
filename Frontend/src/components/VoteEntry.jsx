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
                <img src="./heart.svg" height={"30px"} width={"30px"} />
            </button>
        </div>
    );
};
export default VoteEntry;
