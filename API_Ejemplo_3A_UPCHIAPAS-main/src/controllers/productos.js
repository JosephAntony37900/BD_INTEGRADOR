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
  console.log('Productos - Conexión a la BD establecida');
});

exports.getAllProductos = (req, res) => {
  db.query('SELECT * FROM Producto', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los productos');
      throw err;
    }
    res.json(result);
  });
};

exports.addProducto = (req, res) => {
  const newProducto = req.body;
  db.query('INSERT INTO Producto SET ?', newProducto, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar el producto');
      throw err;
    }
    res.status(201).send('Producto agregado correctamente');
  });
};

exports.updateProducto = (req, res) => {
  const productoId = req.params.id;
  const updatedProducto = req.body;
  db.query('UPDATE Producto SET ? WHERE id_producto = ?', [updatedProducto, productoId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el producto');
      throw err;
    }
    res.send('Producto actualizado correctamente');
  });
};

exports.deleteProducto = (req, res) => {
  const productoId = req.params.id;
  db.query('DELETE FROM Producto WHERE id_producto = ?', productoId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el producto');
      throw err;
    }
    res.send('Producto eliminado correctamente');
  });
};
