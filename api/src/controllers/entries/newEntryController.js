//importamos el modelo que inserta los valores en la tabla en la base de datos
import insertEntryModel from '../../models/entries/insertEntryModel.js';
import insertPhotoModel from '../../models/entries/insertPhotoModel.js';
import { savePhotoService } from '../../services/photoService.js';
//Importamos los servicios 
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el esquema
import { newEntrySchema, imgSchema, } from '../../schemas/entries/newEntrySchema.js';

const newEntryController = async (req, res, next) => {

    try {
        const { title, category, place, sortDescription, text } = req.body;

        
        //El método Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino.
        // Devuelve el objeto destino.
       
        const entryId = await insertEntryModel(title, category, place, sortDescription, text, req.user.id);
        let photos=[];
       

        if(req.files){
            for(let photo of Object.values(req.files).slice(0,3)){
                
                let photoName = await savePhotoService(photo, 500);

                const photoId = await insertPhotoModel(photoName, entryId);

                photos.push({
                    id: photoId,
                    name: photoName
                })
            }
        }
        await validateSchemaUtil(newEntrySchema, Object.assign(req.body));
        await validateSchemaUtil(imgSchema);

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
                    photos,
                    userId: req.user.id,
                    createdAt: new Date()
                },
            }
        });

    } catch (err) {
        next(err);
    }
};

export default newEntryController;