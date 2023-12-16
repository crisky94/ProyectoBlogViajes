//importamos el modelo que inserta los valores en la tabla en la base de datos
import insertEntryModel from '../../models/entries/insertEntryModel.js';
import insertPhotoModel from '../../models/entries/insertPhotoModel.js';

//Importamos los servicios 
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema
import { newEntrySchema, imgSchema, } from '../../schemas/entries/newEntrySchema.js';

const newEntryController = async (req, res, next) => {

    try {
        const { title, category, place, sortDescription, text } = req.body;

        await validateSchemaUtil(newEntrySchema, Object.assign(req.body));
        await validateSchemaUtil(imgSchema);
        //El método Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino.
        // Devuelve el objeto destino.

        const entryId = await insertEntryModel(title, category, place, sortDescription, text, req.user.id);
        const photoPath = req.file.path;
        const mimetype = req.file.mimetype; //imagen/jpge
        const format = mimetype.split("/")[1]; //jpge
        const photoPathAbsolut = `${photoPath}.${format}`;
        await insertPhotoModel(photoPathAbsolut, entryId);

        res.json({
            status: "ok",
            data: {
                entry: {
                    id: entryId,
                    title,
                    category,
                    place,
                    sortDescription,
                    text,
                    photoPath: photoPath,
                    photoFormat: mimetype,
                    userId: res.user.id,
                    createdAt: new Date()
                },
            }
        });

    } catch (err) {
        next(err);
    }
};

export default newEntryController;