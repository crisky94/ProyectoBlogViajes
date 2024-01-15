import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from './../../db/getPool.js';

import {
  emailAlreadyRegisteredError,
  userAlreadyRegisteredError,
} from './../../services/errorService.js';

const insertUserModel = async (username, email, password) => {
  const pool = await getPool();

  // Comprobar si hay usuarios con ese email
  let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
    username,
  ]);

  if (users.lenght > 0) {
    emailAlreadyRegisteredError();
  }

  // Comprobar si hay usuarios con ese nombre
  [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

  if (users.lenght > 0) {
    userAlreadyRegisteredError;
  }

  // Encriptar la password
  const encryptedPassword = await bcrypt.hash(password, 8);

  // Insertar el usuario
  await pool.query(
    `INSERT INTO users(id, username, email, password) VALUES(?, ?, ?, ?)`,
    [uuid(), username, email, encryptedPassword]
  );
};

export default insertUserModel;
