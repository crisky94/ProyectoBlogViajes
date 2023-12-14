import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema Joi
const voteEntrySchema = joi.object({
  value: joi
    .number()
    .integer()
    .min(1)
    .max(3)
    .required()
    .messages(joiErrorMessages),
});

export default voteEntrySchema;
