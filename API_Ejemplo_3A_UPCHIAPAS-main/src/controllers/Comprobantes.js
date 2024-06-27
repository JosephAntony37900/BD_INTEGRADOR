const mysql = require('mysql2');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
db.connect((err) => {
    if (err) throw err;
    console.log('Comprobantes-Conexión a la BD establecida');
  });
// Obtener todos los comprobantes
exports.getAllComprobantes = (req, res) => {
  db.query('SELECT * FROM Comprobantes', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los comprobantes');
      throw err;
    }
    res.json(result);
  });
};

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

// Agregar un nuevo comprobante
exports.addComprobante = [authenticateJWT, (req, res) => {
  const newComprobante = req.body;
  db.query('INSERT INTO Comprobantes SET ?', newComprobante, (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar el comprobante');
      return;
    }
    res.status(201).send('Comprobante agregado correctamente');
  });
}];

// Eliminar un comprobante
exports.deleteComprobante = [authenticateJWT, (req, res) => {
  const comprobanteId = req.params.id;
  db.query('DELETE FROM Comprobantes WHERE id = ?', comprobanteId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el comprobante');
      throw err;
    }
    res.send('Comprobante eliminado correctamente');
  });
}];