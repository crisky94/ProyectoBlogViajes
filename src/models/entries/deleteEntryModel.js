import getPool from '../../db/getPool.js';
const deleteEntryModel = async (entryId) => {
    const pool = await getPool();

 

    await pool.query(`DELETE FROM entries WHERE id = ?`,
        [entryId]);

    

};

export default deleteEntryModel;