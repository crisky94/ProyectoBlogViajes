import newEntryController from '../controllers/entries/newEntryController.js';
import deleteEntryController from '../controllers/entries/deleteEntryController.js';
// import entryExistsController from '../middleware/entryExistsController.js';

import voteEntryController from '../controllers/entries/voteEntryController.js';
import authUserController from '../middleware/authUserController.js';
import userExistsController from '../middleware/userExistsController.js';
import entryExistsController from '../middleware/entryExistsController.js';

// Importamos las funciones controladoras de los middleware de Entries
import getAllEntries from '../controllers/entries/getAllEntries.js';
import getEntriesByPlace from '../controllers/entries/getEntriesByPlace.js';
import getEntriesByCategory from '../controllers/entries/getEntriesByCategory.js';
import getEntriesByCategoryAndPlace from '../controllers/entries/getEntriesByPlaceAndCategory.js';
import getEntriesById from '../controllers/entries/getEntriesById.js';

// Importamos las funciones controladoras de los middleware de errores
import errorRouteController from '../controllers/errors/errorRouteController.js';
import errorController from '../controllers/errors/errorController.js';

// Importamos la función controladora del middleware de orden por votos
import getEntriesOrderedController from '../controllers/entries/getEntriesOrderedController.js';

// Importamos la función controladora del middleware de orden por fecha
import getEntriesOrderedByDateController from '../controllers/entries/getEntriesOrderedByDateController.js';

import express from 'express';
const router = express.Router();

//ruta para crear una recomendacion con foto
router.post(
  '/entries',
  authUserController,
  newEntryController,
  entryExistsController
);

//ruta para borrar la foto y la recomendacion
router.delete('/entries/:id', authUserController, deleteEntryController);

// Votar una entrada.
router.post(
  '/entries/:entryId/votes',
  authUserController,
  userExistsController,
  entryExistsController,
  voteEntryController
);

// Middleware que retorna el listado de todas las entries.
router.get('/entries', getAllEntries);

// Middleware que retorna entries por place.
router.get('/entries/place/:entriesPlace', getEntriesByPlace);

// Middleware que retorna entries por category.
router.get('/entries/category/:entriesCategory', getEntriesByCategory);

// Middleware que retorna entries por category y place.
router.get(
  '/entries/place/:entriesPlace/category/:entriesCategory',
  getEntriesByCategoryAndPlace
);

// Middleware que retorna entries por id
router.get('/entries/:id', getEntriesById);

// Middleware que retorna las entries ordenadas por votos.
router.get('/entries/order/ordered-by-votes', getEntriesOrderedController);

// Middleware que retorna las entries ordenadas por fecha.
router.get('/entries/order/ordered-by-date', getEntriesOrderedByDateController);

// Middleware de ruta no encontrada.
router.use(errorRouteController);

// Middleware de gestión de errores.
router.use(errorController);

export default router;
