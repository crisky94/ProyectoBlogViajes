import getPool from '../../db/getPool.js';
const deleteEntryModel = async (entryId, userId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM entries WHERE id = ? AND userId = ?`,
        [entryId, userId]);

};

export default deleteEntryModel;