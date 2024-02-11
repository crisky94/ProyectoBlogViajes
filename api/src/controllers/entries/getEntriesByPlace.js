import getPool from '../../db/getPool.js';

const getEntriesByPlace = async (req, res, next) => {
  try {
    const pool = await getPool();
    const { entriesPlace } = req.params;

    const [entries] = await pool.query(
      `SELECT entries.*, 
       users.username,
       (SELECT entryPhotos.name 
        FROM entryPhotos 
        WHERE entries.id = entryPhotos.entryId 
        LIMIT 1) AS photoName, 
       COUNT(DISTINCT entryVotes.id) AS voteCount 
FROM entries 
LEFT JOIN entryVotes ON entryVotes.entryId = entries.id 
LEFT JOIN users ON entries.userId = users.id
WHERE entries.place = ? 
GROUP BY entries.id
`,
      [entriesPlace]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con ese lugar ${entriesPlace}`
      );
      err.httpStatus = 404;
      throw err;
    }

    const formattedEntries = entries.map((entry) => ({
      id: entry.id,
      username: entry.username,
      title: entry.title,
      category: entry.category,
      place: entry.place,
      sortDescription: entry.sortDescription,
      text: entry.text,
      userId: entry.userId,
      createdAt: entry.createdAt,
      photos: [
        {
          id: entry.photoId,
          name: entry.photoName,
        },
      ],
      voteCount: entry.voteCount,
    }));

    res.send({
      status: 'ok',
      data: {
        post: formattedEntries,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getEntriesByPlace;
