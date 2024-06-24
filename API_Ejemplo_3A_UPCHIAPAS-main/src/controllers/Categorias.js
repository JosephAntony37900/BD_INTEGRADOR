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
  console.log('Categorias - Conexión a la BD establecida');
});

exports.getAllCategorias = (req, res) => {
  db.query('SELECT * FROM Categorias', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener las categorías');
      throw err;
    }
    res.json(result);
  });
};

exports.addCategoria = (req, res) => {
  const newCategoria = req.body;
  db.query('INSERT INTO Categorias SET ?', newCategoria, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar la categoría');
      throw err;
    }
    res.status(201).send('Categoría agregada correctamente');
  });
};

exports.updateCategoria = (req, res) => {
  const categoriaId = req.params.id;
  const updatedCategoria = req.body;
  db.query('UPDATE Categorias SET ? WHERE id_Categorias = ?', [updatedCategoria, categoriaId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar la categoría');
      throw err;
    }
    res.send('Categoría actualizada correctamente');
  });
};

exports.deleteCategoria = (req, res) => {
  const categoriaId = req.params.id;
  db.query('DELETE FROM Categorias WHERE id_Categorias = ?', categoriaId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar la categoría');
      throw err;
    }
    res.send('Categoría eliminada correctamente');
  });
};
