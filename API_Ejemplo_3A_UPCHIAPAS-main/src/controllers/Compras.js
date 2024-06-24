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
    console.log('Compras-Conexión a la BD establecida');
  });
// Obtener todas las compras
exports.getAllCompras = (req, res) => {
  db.query('SELECT * FROM Compras', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener las compras');
      throw err;
    }
    res.json(result);
  });
};

// Agregar una nueva compra
exports.addCompra = (req, res) => {
  const newCompra = req.body;
  db.query('INSERT INTO Compras SET ?', newCompra, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar la compra');
      return;
    }
    res.status(201).send('Compra agregada correctamente');
  });
};

// Actualizar una compra existente
exports.updateCompra = (req, res) => {
  const compraId = req.params.id;
  const updatedCompra = req.body;
  db.query('UPDATE Compras SET ? WHERE id = ?', [updatedCompra, compraId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar la compra');
      throw err;
    }
    res.send('Compra actualizada correctamente');
  });
};

// Eliminar una compra
exports.deleteCompra = (req, res) => {
  const compraId = req.params.id;
  db.query('DELETE FROM Compras WHERE id = ?', compraId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar la compra');
      throw err;
    }
    res.send('Compra eliminada correctamente');
  });
};
