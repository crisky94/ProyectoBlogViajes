import express from 'express';
const app = express();
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import getPool from './src/db/getPool.js';
import routes from './src/routes/index.js';

app.use(express.json());
app.use(morgan('dev'))
// Middleware que indica a express dónde están las rutas.
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(
    `El servidor esta escuchando en el puerto ${process.env.PORT}...`
  );
});
