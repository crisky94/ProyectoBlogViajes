import getPool from "../../db/getPool.js";

const getAllEntries = async (req, res, next) => {
  try {
    const pool = await getPool();

    const [entries] = await pool.query(
      `SELECT * FROM entries 
      LEFT JOIN entryVotes ON entryVotes.entryId = entries.id 
      INNER JOIN users ON users.id = entries.userId 
      ORDER BY entries.createdAt DESC`
    );

    for (const entry of entries) {
      const [photos] = await pool.query(
        `
                SELECT id, name FROM entryPhotos WHERE entryId=?
            `,
        [entry.id]
      );

      //creo una nueva clave al objeto dentro del array
      entry.photos = photos;
    }

    if (entries.length < 1) {
      const err = new Error("No se ha encontrado ninguna recomendación");
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

export default getAllEntries;
