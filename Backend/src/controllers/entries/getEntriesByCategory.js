import getPool from '../../db/getPool.js';

const getEntriesByCategory = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { entriesCategory } = req.params;

    const [entries] = await pool.query(
      'SELECT entries.*, entryPhotos.name AS photoName FROM entries LEFT JOIN entryPhotos ON entries.id = entryPhotos.entryId WHERE entries.category = ?',
      [entriesCategory]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con esa categoría ${entriesCategory}`
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

export default getEntriesByCategory;
