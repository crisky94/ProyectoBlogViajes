// Importamos las dependencias.


// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, entryId) => {
    const pool = await getPool();
    //const photoId = uuid();
    const [result] = await pool.query(
        `
            INSERT INTO entryPhotos ( name, entryId)
            VALUES (?,?)
        `,
        [ photoName, entryId]
    );

    const { insertId } = result;

    return insertId;
}

export default insertPhotoModel;