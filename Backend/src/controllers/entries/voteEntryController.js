import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import insertVoteModel from '../../models/entries/insertVoteModel.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import voteEntrySchema from '../../schemas/entries/voteEntrySchema.js';

import { cannotVoteOwnEntryError } from '../../services/errorService.js';

const voteEntryController = async (req, res, next) => {
  try {
    const { entryId } = req.params;
    const { value = 1 } = req.body;

    await validateSchemaUtil(voteEntrySchema, {value});

    const entry = await selectEntryByIdModel(entryId);

    // Comprobar que el usuario no es quien ha publicado la entrada
    if (entry.userId === req.user.id) {
      cannotVoteOwnEntryError();
    }

    // Insertar votos
    const totalVotes = await insertVoteModel(value, entryId, req.user.id);

    res.send({
      status: 'ok',
      data: {
        totalVotes,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default voteEntryController;
