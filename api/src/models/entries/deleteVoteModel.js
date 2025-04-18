// models/entries/deleteVoteModel.js
import getPool from '../../db/getPool.js';

const deleteVoteModel = async (entryId, userId) => {
  const pool = await getPool();

  // 1) Borra el voto del usuario en esa entrada
  const [result] = await pool.query(
    `DELETE FROM entryVotes 
    WHERE entryId = ? AND userId = ?`,
    [entryId, userId]
  );

  // 2) Recalcula el total de votos tras el borrado
  const [[{ voteCount }]] = await pool.query(
    `SELECT COUNT(*) AS voteCount 
    FROM entryVotes 
    WHERE entryId = ?`,
    [entryId]
  );

  return voteCount, result;
};

export default deleteVoteModel;
