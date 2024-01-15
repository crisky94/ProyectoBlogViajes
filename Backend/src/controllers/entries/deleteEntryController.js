
import deleteEntryModel from '../../models/entries/deleteEntryModel.js';
import deletePhotoModel from '../../models/entries/deletePhotoModel.js';
import deleteEntryVotesModel from '../../models/entries/deleteEntryVotesModel.js';
import { notFoundError } from '../../services/errorService.js';
import getPool from '../../db/getPool.js';

const deleteEntryController = async (req, res, next) => {

    try {

        const { id } = req.params;
       
        const pool = await getPool();
        
        // Comprobar si hay entradas con ese Id
        const [entries] = await pool.query(`SELECT id FROM entries WHERE id = ?`, [
            id,
        ]);

        if (entries.length < 1) {
            notFoundError('entrada');
            return
        }

        await deletePhotoModel(id);
        await deleteEntryVotesModel(id)
        await deleteEntryModel(id, req.user.id);

        res.json({
            status: "ok",
            messsage: "Se ha borrado la publicacion con exito"
        });

    } catch (err) {
        next(err);
    }
};

export default deleteEntryController;