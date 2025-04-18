import getPool from "../../db/getPool.js";

const deleteVote = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { id: entryId } = req.params;
    const userId = req.user.id;

    const [result] = await pool.query(
      `DELETE FROM entryVotes WHERE entryId = ? AND userId = ?`,
      [entryId, userId]
    );

    if (result.affectedRows === 0) {
      const err = new Error("No se encontró el voto para eliminar.");
      err.httpStatus = 404;
      throw err;
    }

    res.send({
      status: "ok",
      message: "Voto eliminado correctamente",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteVote;
