var express = require('express');
var db = require('../Data/database');
var bcrypt = require('bcryptjs');

var app = express();

//////////
// Get
//////////
app.get('/', (req, res) => {
  db.sequelize
    .query(
      'EXEC dbo.ObtenerDoctores @Termino = :termino, @Genero = :genero, @Locacion = :locacion',
      {
        replacements: {
          termino: req.query.termino || null,
          genero: req.query.genero || null,
          locacion: req.query.locacion || null,
        },
      }
    )
    .then((doctores) => {
      for (let doctor of doctores[0]) {
        doctor.Experiencia = JSON.parse(doctor.Experiencia);
        doctor.Estudios = JSON.parse(doctor.Estudios);
        doctor.Especialidades = JSON.parse(doctor.Especialidades);
        doctor.Idioma = JSON.parse(doctor.Idioma);
        doctor.RedesSociales = JSON.parse(doctor.RedesSociales);
      }

      return res.status(200).json({
        ok: true,
        doctores: doctores[0],
      });
    });
});

//////////
// Get
//////////
app.get('/:id', (req, res) => {
  var id = req.params.id;
  db.sequelize
    .query('EXEC dbo.ObtenerDoctorID @IdDoctor = :id', {
      replacements: { id: id },
    })
    .then((doctor) => {
      return res.status(200).json({
        ok: true,
        doctor: doctor['0'],
      });
    });
});

//////////
// Post
//////////
app.post('/', (req, res) => {
  var body = req.body;
  console.log(body);

  db.sequelize
    .query(
      'EXEC dbo.CrearNuevoDoctor @Nombre = :nombre, @PrimerApellido = :primerApellido, @SegundoApellido = :segundoApellido, @Correo = :correo, @Contrasena = :contrasena,  @Celular = :celular, @Genero = :genero ,@Locacion = :locacion,	@FechaNacimiento = :fechaNacimiento',
      {
        replacements: {
          nombre: body.nombre,
          primerApellido: body.primerApellido,
          segundoApellido: body.segundoApellido || '',
          correo: body.correo,
          contrasena: bcrypt.hashSync(body.contrasena, 10),
          celular: body.celular,
          genero: body.genero || true,
          fechaNacimiento: body.fechaNacimiento,
          locacion: body.locacion,
        },
      }
    )
    .then((resp) => {
      console.log(resp);
      return res.status(201).json({
        ok: true,
        mensaje: 'Se ha creado el registro correctamente',
      });
    });
});

//////////
// Put
//////////
app.put('/:id', (req, res) => {
  var id = req.params.id;
  var body = req.body;

  db.sequelize
    .query(
      'EXEC dbo.ActualizarDoctorExistente @Nombre = :nombre, @PrimerApellido = :primerApellido, @SegundoApellido = :segundoApellido, @Correo = :correo, @Contrasena = :contrasena, @WebURL = :paginaWeb, @Celular = :celular, @TelefonoOficina = :telefonoOficiona ,@Genero = :genero ,@Locacion = :locacion,	@SobreMi = :sobreMi,@Foto = :foto,@FechaNacimiento = :fechaNacimiento, @DoctorID  = :id ',
      {
        replacements: {
          nombre: body.nombre || null,
          primerApellido: body.primerApellido || null,
          segundoApellido: body.segundoApellido || null,
          correo: body.correo || null,
          contrasena: body.contrasena || null,
          paginaWeb: body.paginaWeb || null,
          celular: body.celular || null,
          telefonoOficiona: body.telefonoOficiona || null,
          genero: body.genero || null,
          sobreMi: body.sobreMi || null,
          foto: body.foto || null,
          fechaNacimiento: body.fechaNacimiento || null,
          locacion: body.locacion || null,
          id: id,
        },
      }
    )
    .then((resp) => {
      return res.status(200).json({
        ok: true,
        mensaje: 'Se ha actualizado el registro correctamente',
      });
    });
});

module.exports = app;
