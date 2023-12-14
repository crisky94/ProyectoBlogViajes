import express from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import getPool from "./src/db/getPool.js";
import routes from "./src/routes/index.js";

// Importamos las funciones controladoras de los middleware de Entries
import getAllEntries from "./src/controllers/entries/getAllEntries.js";
import getEntriesByPlace from "./src/controllers/entries/getEntriesByPlace.js";
import getEntriesByCategory from "./src/controllers/entries/getEntriesByCategory.js";
import getEntriesById from "./src/controllers/entries/getEntriesById.js";

// Importamos las funciones controladoras de los middleware de errores
import errorRouteController from "./src/controllers/errors/errorRouteController.js";
import errorController from "./src/controllers/errors/errorController.js";

app.use(express.json());
app.use(morgan("dev"));
// Middleware que indica a express dónde están las rutas.
app.use(routes);

// Middleware que retorna el listado de todas las entries.
app.get("/recomendaciones", getAllEntries);

// Middleware que retorna entries por place.
app.get("/recomendaciones/place/:entriesPlace", getEntriesByPlace);

// Middleware que retorna entries por category.
app.get("/recomendaciones/category/:entriesCategory", getEntriesByCategory);

// Middleware que retorna entries por id
app.get("/recomendaciones/:id", getEntriesById);

// Middleware de ruta no encontrada.
app.use(errorRouteController);

// Middleware de gestión de errores.
app.use(errorController);

app.listen(process.env.PORT, () => {
  console.log(
    `El servidor esta escuchando en el puerto ${process.env.PORT}...`
  );
});
