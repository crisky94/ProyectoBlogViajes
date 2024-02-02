// Importa tu pool o configuración de base de datos
import getPool from '../../db/getPool.js';

const getEntriesByCategoryAndPlace = async (req, res, next) => {
  try {
    const pool = await getPool();

    // Obtén los parámetros de la URL
    const { entriesPlace, entriesCategory } = req.params;

    // Realiza la consulta a la base de datos para obtener las recomendaciones
    const [entries] = await pool.query(
      'SELECT entries.*, entryPhotos.name AS photoName FROM entries LEFT JOIN entryPhotos ON entries.id = entryPhotos.entryId WHERE entries.place = ? AND entries.category = ?',
      [entriesPlace, entriesCategory]
    );

    if (entries.length < 1) {
      const err = new Error(
        `No se han encontrado recomendaciones relacionadas con esa categoría (${entriesCategory}) y lugar (${entriesPlace})`
      );
      err.httpStatus = 404;
      throw err;
    }

    // Formatea los resultados según tus necesidades
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

    // Envía la respuesta con los datos formateados
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
