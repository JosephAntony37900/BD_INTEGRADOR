const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
db.connect((err) => {
    if (err) throw err;
    console.log('ListaDeDeseos-Conexión a la BD establecida');
  });
// Obtener todas las listas de deseos
exports.getAllListaDeseos = (req, res) => {
  db.query('SELECT * FROM ListaDeDeseos', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener las listas de deseos');
      throw err;
    }
    res.json(result);
  });
};

// Agregar una nueva lista de deseos
exports.addListaDeseo = (req, res) => {
  const newListaDeseo = req.body;
  db.query('INSERT INTO ListaDeDeseos SET ?', newListaDeseo, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar la lista de deseos');
      return;
    }
    res.status(201).send('Lista de deseos agregada correctamente');
  });
};

// Actualizar una lista de deseos existente
exports.updateListaDeseo = (req, res) => {
  const listaDeseoId = req.params.id;
  const updatedListaDeseo = req.body;
  db.query('UPDATE ListaDeDeseos SET ? WHERE id = ?', [updatedListaDeseo, listaDeseoId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar la lista de deseos');
      throw err;
    }
    res.send('Lista de deseos actualizada correctamente');
  });
};

// Eliminar una lista de deseos
exports.deleteListaDeseo = (req, res) => {
  const listaDeseoId = req.params.id;
  db.query('DELETE FROM ListaDeDeseos WHERE id = ?', listaDeseoId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar la lista de deseos');
      throw err;
    }
    res.send('Lista de deseos eliminada correctamente');
  });
};
