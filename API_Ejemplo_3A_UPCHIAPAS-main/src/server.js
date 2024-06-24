const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const usersJWTRoutes = require('./routes/users_jwt');
const ventasRoutes = require('./routes/ventas');
const proveedoresRoutes = require('./routes/proveedores');
const categoriasRoutes= require('./routes/Categorias');
const comprobantesRoutes = require('./routes/Comprobantes');
const comprasRoutes = require('./routes/Compras');
const listadeDeseosRoutes = require('./routes/ListaDeDeseos');
const productosRoutes = require('./routes/productos');
require('dotenv').config();

const app = express();
const port = process.env.DB_PORT || 3000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/usersJWT', usersJWTRoutes);
app.use('/ventas', ventasRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/comprobantes', comprobantesRoutes);
app.use('/compras', comprasRoutes);
app.use('/listadeseos', listadeDeseosRoutes);
app.use('/productos', productosRoutes);

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
