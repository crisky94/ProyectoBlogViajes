import getPool from '../../db/getPool.js';

const getEntriesOrderedByDateController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const [entries] = await pool.query(
      `SELECT
        entries.id,
        entries.title,
        entries.category,
        entries.place,
        entries.sortDescription,
        entries.text,
        entries.userId,
        entries.createdAt,
        GROUP_CONCAT(DISTINCT entryPhotos.name) AS photos,
        users.username,
        COUNT(DISTINCT entryVotes.id) AS voteCount
      FROM entries
      LEFT JOIN entryVotes ON entryVotes.entryId = entries.id
      LEFT JOIN users ON users.id = entries.userId
      LEFT JOIN entryPhotos ON entryPhotos.entryId = entries.id
      GROUP BY entries.id
      ORDER BY entries.createdAt ASC;`
    );

    if (entries.length < 1) {
      const err = new Error(
        'No se ha encontrado votos para ordenar las recomendaciones'
      );
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

export default getEntriesOrderedByDateController;
