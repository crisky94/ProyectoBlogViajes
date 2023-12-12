import newUserSchema from '../../schemas/users/newUserSchema.js';
import insertUserModel from '../../models/users/insertUserModel.js';
import validateSchemaUtil from './../../utils/validateSchemaUtil.js';

// Funcion controladora para crear usuario
const newUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username);

    // Validar los datos enviados
    await validateSchemaUtil(newUserSchema, req.body);

    // Insertar el usuario
    await insertUserModel(username, email, password);

    res.send({
      status: 'ok',
      message: 'Usuario creado con éxito!',
    });
  } catch (err) {
    next(err);
  }
};

export default newUserController;
