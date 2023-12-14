import newEntryController from '../controllers/entries/newEntryController.js';
import deleteEntryController from '../controllers/entries/deleteEntryController.js';
// import entryExistsController from '../middleware/entryExistsController.js';

import voteEntryController from '../controllers/entries/voteEntryController.js';
import authUserController from '../middleware/authUserController.js';
import userExistsController from '../middleware/userExistsController.js';
import entryExistsController from '../middleware/entryExistsController.js';

import express from 'express';
const router = express.Router();

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

//ruta para crear una recomendacion con foto
router.post(
  '/entries',
  upload.single('image'),
  newEntryController,
  entryExistsController
);

//ruta para borrar la foto y la recomendacion
router.delete(
  '/entries',
  upload.single(''),
  deleteEntryController,
  entryExistsController
);

// Votar una entrada.
router.post(
  '/entries/:entryId/votes',
  authUserController,
  userExistsController,
  entryExistsController,
  voteEntryController
);

export default router;
