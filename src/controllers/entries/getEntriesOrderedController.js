import getPool from "../../db/getPool.js";

const getEntriesOrderedController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const [entries] = await pool.query(
      `
      SELECT entries.*, COUNT(entryVotes.id) AS voteCount
      FROM entries
      LEFT JOIN entryVotes ON entries.id = entryVotes.entryId
      GROUP BY entries.id
      ORDER BY voteCount DESC
      `
    );

    if (entries.length < 1) {
      const err = new Error(
        "No se ha encontrado votos para ordenar las recomendaciones"
      );
      err.httpStatus = 404;
      throw err;
    }

    res.send({
      status: "ok",
      data: {
        entries,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getEntriesOrderedController;
