
import deleteEntryModel from '../../models/entries/deleteEntryModel.js';
import deletePhotoModel from '../../models/entries/deletePhotoModel.js';

const deleteEntryController = async (req, res, next) => {

    try {
        const { id } = req.body;

        await deletePhotoModel(id);
        await deleteEntryModel(id);

        res.json({
            status: "ok",
            messsage: "Se ha borrado la publicacion con exito"
        });

    } catch (err) {
        next(err);
    }
};

export default deleteEntryController;