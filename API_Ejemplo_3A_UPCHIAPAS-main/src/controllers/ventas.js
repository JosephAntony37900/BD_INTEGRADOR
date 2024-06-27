const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
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

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Prohibido (token inválido)
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No autorizado (sin token)
  }
};

exports.getAllVentas = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Venta', (err, result) => {
    if (err) {
      console.error('Error al obtener las ventas', err);
      return res.status(500).send('Error al obtener las ventas');
    }
    res.json(result);
  });
}];

exports.addVenta = [authenticateJWT, (req, res) => {
  const newVenta = req.body;
  db.query('INSERT INTO Venta SET ?', newVenta, (err, result) => {
    if (err) {
      console.error('Error al agregar la venta', err);
      return res.status(500).send('Error al agregar la venta');
    }
    res.status(201).send('Venta agregada correctamente');
  });
}];


//update y delete idk

