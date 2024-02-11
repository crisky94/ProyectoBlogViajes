import express from 'express';
const app = express();
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import routes from './src/routes/index.js';
import path from 'path';
import fileUpload from 'express-fileupload';

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Reemplaza con tu URL frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors())
const staticDir = path.join(process.cwd(), './src/uploads');

app.use('/uploads', express.static(staticDir));

app.use(fileUpload());

// Middleware que indica a express dónde están las rutas.
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(
    `El servidor esta escuchando en el puerto ${process.env.PORT}...`
  );
});
