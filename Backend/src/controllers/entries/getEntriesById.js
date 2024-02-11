import getPool from "../../db/getPool.js";

const getEntriesById = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { id } = req.params;

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
      INNER JOIN users ON users.id = entries.userId
      LEFT JOIN entryPhotos ON entryPhotos.entryId = entries.id
      WHERE entries.id = ?
      GROUP BY entries.id
      ORDER BY entries.createdAt DESC;`,
      [id]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con el id: ${id}`
      );
      err.httpStatus = 404;
      throw err;
    }

    res.send({
      status: "ok",
      data: {
        // Si el entrie que buscamos existe, estará en la posición 0 del array de entries.
        post: entries[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getEntriesById;
