import getPool from './getPool.js';

const main = async () => {
    // Variable que almacenará una conexión con la base de datos.
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS entryVotes, entryPhotos, entries, users'
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Creamos la tabla de entradas.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entries (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(50) NOT NULL,
                category VARCHAR(50) NOT NULL,
                place VARCHAR(30) NOT NULL,
                sortDescription VARCHAR(200) NOT NULL,
                text TEXT NOT NULL,
                userId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Creamos la tabla de fotos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entryPhotos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                entryId CHAR(36) NOT NULL,
                FOREIGN KEY (entryId) REFERENCES entries(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de votos.
        await pool.query(`
    CREATE TABLE IF NOT EXISTS entryVotes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    value TINYINT UNSIGNED NOT NULL,
    userId CHAR(36) NOT NULL,
    entryId CHAR(36) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (entryId) REFERENCES entries(id),
    UNIQUE KEY unique_vote (userId, entryId)
)

            
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Cerramos el proceso.
        process.exit();
    }
};

// Ejecutamos la función anterior.
main();
