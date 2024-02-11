
import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

//Esquema de entradas
export const newEntrySchema = joi.object({
    title: joi
        .string()
        .min(3)
        .max(50)
        .required()
        .messages(joiErrorMessages),
    category: joi
        .string()
        .min(5)
        .max(50)
        .required()
        .messages(joiErrorMessages),
    place: joi
        .string()
        .min(3)
        .max(30)
        .required()
        .messages(joiErrorMessages),
    sortDescription: joi
        .string()
        .min(10)
        .max(200)
        .required()
        .messages(joiErrorMessages),
    text: joi
        .string()
        .min(30)
        .max(800)
        .required()
        .messages(joiErrorMessages)
});

//Esquema de fotos
export const imgSchema = joi
    .object({
        name: joi
            .string()
            .required()
            .messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png', 'image/jpg', 'image/gif')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(5000000).required().messages(joiErrorMessages),
    })
    .unknown(true);


