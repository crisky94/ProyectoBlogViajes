import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Esquema Joi
const voteEntrySchema = joi.object({
  value: joi.number()
    .integer()
    .min(0)  
    .max(1)              // <-- ahora deja pasar 0, 1, 2, … 
    .required()
    .messages(joiErrorMessages),
});


export default voteEntrySchema;
