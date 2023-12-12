import express from 'express';

const router = express.Router();

import newUserController from '../controllers/users/newUserController.js';

// Crear usuario
router.post('/users/register', newUserController);

export default router;
