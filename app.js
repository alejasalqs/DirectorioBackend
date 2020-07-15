// Punto de entrada

var express = require('express');
var db = require('./Data/database');
var bodyParser = require('body-parser');

var app = express();

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 100000000,
  })
);
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));

var doctoresRoute = require('./Rutas/doctores');
var agendaRoute = require('./Rutas/agenda');
var logingRoute = require('./Rutas/auth');

app.use('/doctores', doctoresRoute);
app.use('/agenda', agendaRoute);
app.use('/login', logingRoute);

app.listen(3000, () => {
  console.log('Express server corriendo en el puerto 3000');
});

// Se instancia la base de datos
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Se ha conectado correctamenta a la Base de datos.');
  })
  .catch((err) => {
    console.error('Imposible conectarse a la Base de datos:', err);
  });
