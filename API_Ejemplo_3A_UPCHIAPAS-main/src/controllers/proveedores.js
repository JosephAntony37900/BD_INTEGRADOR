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
  console.log('Proveedores-Conexión a la BD establecida');
});

exports.getAllProveedores = (req, res) => {
  db.query('SELECT * FROM Proveedor', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los proveedores');
      throw err;
    }
    res.json(result);
  });
};

exports.addProveedor = (req, res) => {
  const newProveedor = req.body;
  db.query('INSERT INTO Proveedor SET ?', newProveedor, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar el proveedor');
      throw err;
    }
    res.status(201).send('Proveedor agregado correctamente');
  });
};

exports.updateProveedor = (req, res) => {
  const proveedorId = req.params.id;
  const updatedProveedor = req.body;
  db.query('UPDATE Proveedor SET ? WHERE id_proveedor = ?', [updatedProveedor, proveedorId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el proveedor');
      throw err;
    }
    res.send('Proveedor actualizado correctamente');
  });
};

exports.deleteProveedor = (req, res) => {
  const proveedorId = req.params.id;
  db.query('DELETE FROM Proveedor WHERE id_proveedor = ?', proveedorId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el proveedor');
      throw err;
    }
    res.send('Proveedor eliminado correctamente');
  });
};
