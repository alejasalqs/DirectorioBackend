// Punto de entrada
// Importaciones necesarias
const express = require('express');
const db = require('./Data/database');
const cors = require('cors');

// Creamos el servidor
var app = express();

// COnfigurar CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json());

// Rutas
// Rutas - Autenticaciones
app.use('/api/auth', require('./Rutas/auth'))
// Rutas - Doctores
app.use('/api/doctores', require('./Rutas/doctores.ruta'))
app.use('/api/doctores/especialidades', require('./Rutas/especialidades.ruta'))
app.use('/api/doctores/redessociales', require('./Rutas/redesSociales.ruta'))
app.use('/api/doctores/idiomas', require('./Rutas/idiomas.ruta'))
app.use('/api/doctores/experiencias', require('./Rutas/experiencia.ruta'))
app.use('/api/doctores/estudios', require('./Rutas/estudios.ruta'))
// Rutas - Agenda
app.use('/api/agenda', require('./Rutas/agenda.ruta'))

app.listen(3000, () => {
  console.log('Express server corriendo en el puerto 3000');
});

// Se instancia la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('Se ha conectado correctamenta a la Base de datos.');
  })
  .catch((err) => {
    console.error('Imposible conectarse a la Base de datos:', err);
  });
