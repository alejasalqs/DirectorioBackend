// Punto de entrada
// Importaciones necesarias
const express = require('express');
const db = require('./Data/database');
const cors = require('cors');
const { enviarRecordatorioCita } = require('./Helpers/recordatorios.helpers')

const https = require("https"),
	fs = require("fs");
	
	
const options = {
	key: fs.readFileSync("C:\\Publicado Node JS\\CertificadoEnUso\\privkey.pem"),
	cert: fs.readFileSync("C:\\Publicado Node JS\\CertificadoEnUso\\fullchain.pem")
};

// Creamos el servidor
var app = express();

// COnfigurar CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json());

// En este se crea el server http en el puetro
app.listen(3001, () => {
  console.log('🚀 Express server corriendo en el puerto 3001');
});

// En este se crea el server https en el puetro
https.createServer(options, app).listen(3000);

// Se instancia la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('Se ha conectado correctamenta a la Base de datos.');
  })
  .catch((err) => {
    console.error('Imposible conectarse a la Base de datos:', err);
  });


  enviarRecordatorioCita();

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
// Rutas -  Subir Archivo
app.use('/api/uploads', require('./Rutas/uploads.route'))
// Rutas -  Subir Archivo
app.use('/api/recordatorios', require('./Rutas/recordatorios.ruta'))
// Rutas -  Subir Archivo
app.use('/api/reportes', require('./Rutas/reportes.ruta'))

// Manejo de Errores
app.use((err, req, res, next) => {
  console.log('\x1b[31m%s\x1b[0m', '[ERROR] ' + err.message)
  let log = {
    Mensaje:      err.message ? err.message.substr(0, 500) : 'Error desconocido',
    Descripcion:  err.stack ? err.stack.substr(0, 500) : '',
    Codigo_Error: err.code || -1,
    Fecha:        new Date()
  }
  return res.status(500).json({ ok: false, mensaje: err.message, log });
});
