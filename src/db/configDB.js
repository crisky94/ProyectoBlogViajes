// Configurar la Conexión a MySQL

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión
pool.getConnection()
  .then((connection) => {
    console.log('Conexión a la base de datos establecida');
    connection.release();
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error.message);
  });

export default pool;