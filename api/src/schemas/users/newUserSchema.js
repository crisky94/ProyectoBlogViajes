import joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import joiErrorMessages from '../joiErrorMessages.js';

// Variable para usar joiPassword
const joiPassword = joi.extend(joiPasswordExtendCore);

// Esquema de nuevo usuario
const newUserSchema = joi.object({
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages(joiErrorMessages),

  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net'],
      },
    })
    .messages(joiErrorMessages),

  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfLowercase(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required()
    .messages(joiErrorMessages),
});

export default newUserSchema;
