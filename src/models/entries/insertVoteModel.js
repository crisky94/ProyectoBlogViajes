import { v4 as uuid } from 'uuid';
import getPool from '../../db/getPool.js';
import { voteAlreadyExistsError } from '../../services/errorService.js';

const insertVoteModel = async (value, entryId, userId) => {
  const pool = await getPool();

  // Comprobar si el usuario ya ha votado esa entrada
  const [votes] = await pool.query(
    `SELECT id FROM entryVotes WHERE userId = ? AND entryId = ?`,
    [userId, entryId]
  );

  if (votes.length > 0) {
    voteAlreadyExistsError();
  }

  // Insertar el voto
  await pool.query(
    `INSERT INTO entryVotes(id, value, entryId, userId) VALUES(?, ?, ?, ?)`,
    [uuid(), value, entryId, userId]
  );

  const [votesAvg] = await pool.query(
    `SELECT AVG(value) AS avg FROM entryVotes WHERE entryId = ?`,
    [entryId]
  );

  // Devolvemos la media de votos
  return Number(votesAvg[0].avg);
};

export default insertVoteModel;
