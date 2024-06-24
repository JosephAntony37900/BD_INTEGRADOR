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
  console.log('Venta-Conexión a la BD establecida');
});

exports.getAllVentas = (req, res) => {
  db.query('SELECT * FROM Venta', (err, result) => {
    if (err) {
      console.error('Error al obtener las ventas', err);
      return res.status(500).send('Error al obtener las ventas');
    }
    res.json(result);
  });
};

exports.addVenta = (req, res) => {
  const newVenta = req.body;
  db.query('INSERT INTO Venta SET ?', newVenta, (err, result) => {
    if (err) {
      console.error('Error al agregar la venta', err);
      return res.status(500).send('Error al agregar la venta');
    }
    res.status(201).send('Venta agregada correctamente');
  });
};

exports.updateVenta = (req, res) => {
  const ventaId = req.params.id;
  const updatedVenta = req.body;
  db.query('UPDATE Venta SET ? WHERE id = ?', [updatedVenta, ventaId], (err, result) => {
    if (err) {
      console.error('Error al actualizar la venta', err);
      return res.status(500).send('Error al actualizar la venta');
    }
    res.send('Venta actualizada correctamente');
  });
};

exports.deleteVenta = (req, res) => {
  const ventaId = req.params.id;
  db.query('DELETE FROM Venta WHERE id = ?', ventaId, (err, result) => {
    if (err) {
      console.error('Error al eliminar la venta', err);
      return res.status(500).send('Error al eliminar la venta');
    }
    res.send('Venta eliminada correctamente');
  });
};
