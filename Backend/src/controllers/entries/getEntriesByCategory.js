import getPool from "../../db/getPool.js";

const getEntriesByCategorie = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { entriesCategory } = req.params;

    const [entries] = await pool.query(
      "SELECT * FROM entries WHERE category = ?",
      [entriesCategory]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con esa categoría ${entriesCategory}`
      );
      err.httpStatus = 404;
      throw err;
    }

    res.send({
      status: "ok",
      data: {
        // Si el entrie que buscamos existe, estará en la posición 0 del array de entries.
        post: entries,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getEntriesByCategorie;
