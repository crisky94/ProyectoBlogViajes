import getPool from '../../db/getPool.js';

const getEntriesByPlace = async (req, res, next) => {
  try {
    const pool = await getPool();
    const { entriesPlace } = req.params;

    const [entries] = await pool.query(
      'SELECT entries.*, entryPhotos.name AS photoName FROM entries LEFT JOIN entryPhotos ON entries.id = entryPhotos.entryId WHERE entries.place = ?',
      [entriesPlace]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con ese lugar ${entriesPlace}`
      );
      err.httpStatus = 404;
      throw err;
    }

    const formattedEntries = entries.map((entry) => {
      const photos = entries
        .filter((photo) => photo.id === entry.id)
        .map((photo) => ({
          id: photo.photoId,
          name: photo.photoName,
        }));

      return {
        id: entry.id,
        title: entry.title,
        category: entry.category,
        place: entry.place,
        sortDescription: entry.sortDescription,
        text: entry.text,
        userId: entry.userId,
        createdAt: entry.createdAt,
        photos: photos,
      };
    });

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
