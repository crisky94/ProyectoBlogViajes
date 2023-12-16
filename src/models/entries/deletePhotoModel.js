import getPool from '../../db/getPool.js';
const deletePhotoModel = async (entryId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM entryPhotos WHERE entryId = ?`,
        [entryId]);
        
};

export default deletePhotoModel;