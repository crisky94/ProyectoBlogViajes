// loginUserController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configDB from  '../db/configDB';

async function loginUsuario(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su correo electrónico en la base de datos
    const [rows] = await configDB.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = rows[0];

    // Verificar la contraseña
    const esContraseñaCorrecta = await bcrypt.compare(password, usuario.password);

    if (!esContraseñaCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el usuario y el token en caso de autenticación exitosa
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

export { loginUsuario };
