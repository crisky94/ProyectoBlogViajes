import { useState } from "react";

function VoteEntry({ id, hasVoted, onVote }) {
  const [voted, setVoted] = useState(hasVoted === 1); // iniciar según el backend
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/entries/${id}/votes`,
        {
          method: voted ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al votar");
      }

      setVoted(!voted);
      onVote(); // actualiza votos en el padre
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick} className="like-button">
      {voted ? "❤️ " : "🤍"}
    </button>
  );
}

export default VoteEntry;
