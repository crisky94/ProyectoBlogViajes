// Importa la versión asíncrona del módulo "mysql2".
import mysql from 'mysql2/promise';

// Importa el módulo "dotenv".
import dotenv from 'dotenv';

// Utiliza su método "config" para leer las variables de entorno del fichero ".env".
dotenv.config();

// Desestructura las variables de entorno desde el archivo ".env".
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Declara una variable para almacenar el pool de conexiones.
let pool;

// Crea una función asíncrona para obtener una conexión a la base de datos.
const getPool = async () => {
  try {
    // Creamos una pool temporal.
    const poolTemp = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });

    // Con el pool temporal creamos la base de datos si no existe.
    await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
    // Si no existe un pool de conexiones, créalo.
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10, // Establece un límite máximo de conexiones. Por defecto 10.
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: 'Z', // El valor Z establece la zona horaria como UTC.
      });
    }

    // Retorna el pool de conexiones.
    return pool;
  } catch (err) {
    console.error(err);
  }
};

// Exporta la función "getPool" para usarla en otros archivos de tu proyecto.
export default getPool;
