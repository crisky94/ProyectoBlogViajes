// loginUserController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getPool from '../../db/getPool.js';
const { SECRET } = process.env.SECRET;

async function loginUsuario(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su correo electrónico en la base de datos
    const pool = await getPool();
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = rows[0];

    // Verificar la contraseña
    const esContraseñaCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!esContraseñaCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // MODIFICAOD
    // Objeto con la información que queremos almacenar en el token.
    const tokenInfo = {
      role: usuario.role,
      id: usuario.id,
    };

    // firmamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '7d',
    });
    // MODIFICAOD

    // // Generar un token de autenticación
    // const token = jwt.sign(
    //   { role: usuario.role, usuarioId: usuario.id },
    //   process.env.SECRET,
    //   {
    //     expiresIn: '1h',
    //   }
    // );

    // Devolver el usuario y el token en caso de autenticación exitosa
    res
      .status(200)
      .json({ mensaje: 'Inicio de sesión exitoso', usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

export { loginUsuario };
