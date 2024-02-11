import { v4 as uuid } from 'uuid';
import getPool from '../../db/getPool.js';

const insertEntryModel = async (title, category, place, sortDescription, text, userId) => {
    const pool = await getPool();

    const entryId = uuid();

    await pool.query(`INSERT INTO entries(id, title, category, place, sortDescription, text, userId) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [entryId, title, category, place,sortDescription, text, userId]);

    return entryId;

};

export default insertEntryModel;