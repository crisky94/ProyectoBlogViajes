import getPool from '../../db/getPool.js';

const getEntriesByCategoryAndPlace = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { entriesPlace, entriesCategory } = req.params;

    const [entries] = await pool.query(
      `SELECT entries.*, 
              users.username,
              (SELECT entryPhotos.name 
               FROM entryPhotos 
               WHERE entries.id = entryPhotos.entryId 
               LIMIT 1) AS photoName,
              (SELECT COUNT(DISTINCT entryVotes.id) 
               FROM entryVotes 
               WHERE entryVotes.entryId = entries.id) AS voteCount
       FROM entries 
       LEFT JOIN entryPhotos ON entries.id = entryPhotos.entryId 
       LEFT JOIN users ON entries.userId = users.id
       WHERE entries.place = ? AND entries.category = ?`,
      [entriesPlace, entriesCategory]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con esa categoría (${entriesCategory}) y lugar (${entriesPlace})`
      );
      err.httpStatus = 404;
      throw err;
    }

    const formattedEntries = entries.map((entry) => ({
      id: entry.id,
      title: entry.title,
      category: entry.category,
      place: entry.place,
      sortDescription: entry.sortDescription,
      text: entry.text,
      userId: entry.userId,
      username: entry.username,
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

export default getEntriesByCategoryAndPlace;
