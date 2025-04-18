// import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
// import insertVoteModel from '../../models/entries/insertVoteModel.js';
// import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
// import voteEntrySchema from '../../schemas/entries/voteEntrySchema.js';

// import { cannotVoteOwnEntryError } from '../../services/errorService.js';
// import deleteVoteModel from '../../models/entries/deleteVoteModel.js';

// const voteEntryController = async (req, res, next) => {
//   try {
//     const { entryId } = req.params;
//     const { value = 1 } = req.body;

//     await validateSchemaUtil(voteEntrySchema, {value});

//     const entry = await selectEntryByIdModel(entryId);

//     // Comprobar que el usuario no es quien ha publicado la entrada
//     if (entry.userId === req.user.id) {
//       cannotVoteOwnEntryError();
//     }

//     // Insertar votos
//     let totalVotes;

//     if (value === 0) {
//       // Si el valor es 0, eliminamos el voto
//       await deleteVoteModel(entryId, req.user.id);
//     } else {
//       // Insertar o actualizar voto
//       totalVotes = await insertVoteModel(value, entryId, req.user.id);
//     }

//     res.send({
//       status: 'ok',
//       data: {
//         totalVotes: totalVotes ?? null,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export default voteEntryController;
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import insertVoteModel from '../../models/entries/insertVoteModel.js';
import deleteVoteModel from '../../models/entries/deleteVoteModel.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import voteEntrySchema from '../../schemas/entries/voteEntrySchema.js';
import { cannotVoteOwnEntryError } from '../../services/errorService.js';

const voteEntryController = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const { value = 1 } = req.body;

    await validateSchemaUtil(voteEntrySchema, { value });

    const entry = await selectEntryByIdModel(entryId);
    if (entry.userId === req.user.id) cannotVoteOwnEntryError();

    let totalVotes;
    if (value === 0) {
      // Elimina el voto
      totalVotes = await deleteVoteModel(entryId, req.user.id);
    } else {
      // Inserta solo si no existe
      totalVotes = await insertVoteModel(value, entryId, req.user.id);
    }

    res.send({ status: 'ok', data: { totalVotes } });
  } catch (err) {
    next(err);
  }
};

export default voteEntryController;
