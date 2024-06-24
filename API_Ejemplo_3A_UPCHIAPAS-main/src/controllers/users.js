const mysql = require('mysql2');
const bcrypt = require('bcrypt');
// Cargar las variables de entorno
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Users-Conexión a la BD establecida');
});

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
};

// Agregar un nuevo usuario
exports.addUser = (req, res) => {
  const { usuario, password, email } = req.body; // Asegúrate de que los nombres de los campos coincidan
  if (!usuario || !password || !email) {
    res.status(400).send('Por favor proporciona usuario, contraseña y email');
    return;
  }
  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(password, 10, (err, hash) => { // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      return; // Stop execution if there's an error hashing
    }
    const newUser = { usuario, password: hash, email }; // Construct the new user object
    db.query('INSERT INTO Usuarios SET ?', newUser, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(409).send('El usuario o el email ya existen');
        } else {
          res.status(500).send('Error al agregar el usuario');
        }
        return; // Stop execution if there's an error inserting
      }
      res.status(201).send('Usuario agregado correctamente');
    });
  });
};

// Actualizar un usuario existente
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  db.query('UPDATE Usuarios SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el usuario');
      throw err;
    }
    res.send('Usuario actualizado correctamente');
  });
};

// Eliminar un usuario
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM Usuarios WHERE id = ?', userId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el usuario');
      throw err;
    }
    res.send('Usuario eliminado correctamente');
  });
};
