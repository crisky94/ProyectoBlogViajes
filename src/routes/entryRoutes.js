import newEntryController from "../controllers/entries/newEntryController.js";
import deleteEntryController from "../controllers/entries/deleteEntryController.js";
// import entryExistsController from '../middleware/entryExistsController.js';

import voteEntryController from "../controllers/entries/voteEntryController.js";
import authUserController from "../middleware/authUserController.js";
import userExistsController from "../middleware/userExistsController.js";
import entryExistsController from "../middleware/entryExistsController.js";

// Importamos las funciones controladoras de los middleware de Entries
import getAllEntries from "../controllers/entries/getAllEntries.js";
import getEntriesByPlace from "../controllers/entries/getEntriesByPlace.js";
import getEntriesByCategory from "../controllers/entries/getEntriesByCategory.js";
import getEntriesById from "../controllers/entries/getEntriesById.js";

// Importamos las funciones controladoras de los middleware de errores
import errorRouteController from "../controllers/errors/errorRouteController.js";
import errorController from "../controllers/errors/errorController.js";

import express from "express";
const router = express.Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });

//ruta para crear una recomendacion con foto
router.post(
  "/entries",
  upload.single("image"),
  authUserController,
  newEntryController,
  entryExistsController
);

//ruta para borrar la foto y la recomendacion
router.delete(
  "/entries",
  upload.single(""),
  authUserController,
  deleteEntryController,
  entryExistsController
);

// Votar una entrada.
router.post(
  "/entries/:entryId/votes",
  authUserController,
  userExistsController,
  entryExistsController,
  voteEntryController
);

// Middleware que retorna el listado de todas las entries.
router.get("/recomendaciones", getAllEntries);

// Middleware que retorna entries por place.
router.get("/recomendaciones/place/:entriesPlace", getEntriesByPlace);

// Middleware que retorna entries por category.
router.get("/recomendaciones/category/:entriesCategory", getEntriesByCategory);

// Middleware que retorna entries por id
router.get("/recomendaciones/:id", getEntriesById);

// Middleware de ruta no encontrada.
router.use(errorRouteController);

// Middleware de gestión de errores.
router.use(errorController);

export default router;
