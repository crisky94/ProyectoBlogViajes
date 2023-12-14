import getPool from "../../src/db/getPool.js";

const getEntriesById = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { id } = req.params;

    const [entries] = await pool.query("SELECT * FROM entries WHERE id = ?", [
      id,
    ]);

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
