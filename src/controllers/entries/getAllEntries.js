import getPool from '../../db/getPool.js';

const getAllEntries = async (req, res, next) => {
  try {
    const pool = await getPool();

    const [entries] = await pool.query('SELECT * FROM entries');

    if (entries.length < 1) {
      const err = new Error('No se ha encontrado ninguna recomendación');
      err.httpStatus = 404;
      throw err;
    }

    res.send({
      status: 'ok',
      data: {
        entries,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getAllEntries;
