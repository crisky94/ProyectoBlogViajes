
import deleteEntryModel from '../../models/entries/deleteEntryModel.js';
import deletePhotoModel from '../../models/entries/deletePhotoModel.js';

const deleteEntryController = async (req, res, next) => {

    // res.send(`Hola mundo`)


    try {
        const { id } = req.body;
        console.log(id);

        // const entryId = await insertEntryModel(title, category, place, sortDescription,text, req.user.id);
        await deletePhotoModel(id);
        await deleteEntryModel(id);

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
            messsage: "Se ha borrado la publicacion con exito"
        });

    } catch (err) {
        next(err);
    }
};

export default deleteEntryController;