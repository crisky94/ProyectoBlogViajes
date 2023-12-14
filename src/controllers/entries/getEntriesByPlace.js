import getPool from "../../src/db/getPool.js";

const getEntriesByPlace = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { entriesPlace } = req.params;

    const [entries] = await pool.query(
      "SELECT * FROM entries WHERE place = ?",
      [entriesPlace]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con ese lugar ${entriesPlace}`
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

export default getEntriesByPlace;
