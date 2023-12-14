import getPool from '../db/getPool.js';
import { notFoundError } from '../services/errorService.js';

const entryExistsController = async (req, res, next) => {
  try {
    const pool = await getPool();
    const { entryId } = req.params;

    // Comprobar si hay entradas con ese Id
    const [entries] = await pool.query(`SELECT id FROM entries WHERE id = ?`, [
      entryId,
    ]);

    if (entries.length < 1) {
      notFoundError('entrada');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default entryExistsController;
