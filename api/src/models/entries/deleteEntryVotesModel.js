import getPool from '../../db/getPool.js';
const deleteEntryVotesModel = async (entryId) => {
  const pool = await getPool();

  await pool.query(`DELETE FROM entryVotes WHERE entryId = ?`, [entryId]);
};

export default deleteEntryVotesModel;