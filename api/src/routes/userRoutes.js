import express from 'express';

const router = express.Router();

import newUserController from '../controllers/users/newUserController.js';
import { loginUsuario } from '../schemas/users/loginUserSchema.js';
// Crear usuario
router.post('/users/register', newUserController);
router.post('/users/login', loginUsuario);

export default router;
