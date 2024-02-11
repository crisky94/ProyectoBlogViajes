import getPool from '../../db/getPool.js';

const selectEntryByIdModel = async (entryId, userId = '') => {
  const pool = await getPool();

  const [entries] = await pool.query(
    `
                SELECT 
                    E.id,
                    E.title,
                    E.category,
                    E.place, 
                    E.sortDescription,
                    E.text,
                    E.userId,
                    U.username,
                    BIT_OR(V.userId = ?) AS votedByMe, 
                    E.userId = ? AS owner,
                    AVG(IFNULL(V.value, 0)) AS votes,
                    E.createdAt
                FROM entries E
                LEFT JOIN entryVotes V ON V.entryId = E.id
                INNER JOIN users U ON U.id = E.userId
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
    [userId, userId, entryId]
  );

  // Convertir los datos votedByMe y owner en booleanos
  entries[0].votedByMe = Boolean(entries[0].votedByMe);
  entries[0].owner = Boolean(entries[0].owner);

  // Convertir media votos en number
  entries[0].votes = Number(entries[0].votes);

  return {
    ...entries[0],
  };
};

export default selectEntryByIdModel;
