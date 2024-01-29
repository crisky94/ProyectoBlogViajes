import getPool from "../../db/getPool.js";

const getEntriesById = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { id } = req.params;

    const [entries] = await pool.query(
      `SELECT * FROM entries 
        LEFT JOIN entryVotes ON entryVotes.entryId = entries.id 
        INNER JOIN users ON users.id = entries.userId
        WHERE entries.id = ? `,
      [id]
    );

    for (const entry of entries) {
      const [photos] = await pool.query(
        `
        SELECT * FROM entries
        LEFT JOIN entryPhotos ON entryPhotos.entryId = entries.id 
        
            `,
        [entry.id]
      );

      //creo una nueva clave al objeto dentro del array
      entry.photos = photos;
    }

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
