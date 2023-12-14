//importamos el modelo que inserta los valores en la tabla en la base de datos
import insertEntryModel from '../../models/entries/insertEntryModel.js';
import insertPhotoModel from '../../models/entries/insertPhotoModel.js';

//Importamos los servicios 
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema
import newEntrySchema from '../../schemas/newEntrySchema.js';

const newEntryController = async (req, res, next) => {

    // res.send(`Hola mundo`)


    try {
        const { title, category, place, sortDescription, text } = req.body;
        // Configuración de Multer para manejar la carga de archivos



        // Puedes realizar operaciones adicionales aquí, como guardar la información de la foto en una base de datos, etc.

        //borrar
        let userTemp = '6d85f61f-db5c-4d0a-a8ab-0bf2ce26c0e6';


        await validateSchemaUtil(newEntrySchema, Object.assign(req.body));
        //El método Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino.
        // Devuelve el objeto destino.

        // const entryId = await insertEntryModel(title, category, place, sortDescription,text, req.user.id);
        const entryId = await insertEntryModel(title, category, place, sortDescription, text, userTemp);
        const photoPath = req.file.path;
        const mimetype = req.file.mimetype; //imagen/jpge
        const format = mimetype.split("/")[1] //jpge
        const photoPathAbsolut = `${photoPath}.${format}`;
        const photoId = await insertPhotoModel(photoPathAbsolut, entryId);

        // res.send({
        //     status: "ok",
        //     data: {
        //         entry: {
        //             id: entryId,
        //             title,
        //             category,
        //             place,
        //             sortDescription,
        //             text,
        //             userId: req.user.id,
        //             createdAt: new Date()
        //         },
        //     }
        // });

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
                    userId: '1',
                    createdAt: new Date()
                },
            }
        });
      
    } catch (err) {
        next(err);
    }
};

export default newEntryController;