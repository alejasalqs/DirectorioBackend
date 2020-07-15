var express = require('express');
var db = require('../Data/database');

var app = express();

//////////
// Get
//////////
app.get('/:id', (req, res) => {
  var id = req.params.id;
  db.sequelize
    .query('EXEC dbo.ObtenerEventosAgenda @IdDoctor = :id', {
      replacements: { id: id },
    })
    .then((eventos) => {
      return res.status(200).json({
        ok: true,
        eventos: eventos['0'],
      });
    });
});

//////////
// Post
//////////
app.post('/', (req, res) => {
  var body = req.body;

  db.sequelize
    .query(
      'EXEC dbo.AgregarEventoAgenda @IdDoctor = :id, @Evento = :evento, @FechaInicio = :fechaInicio, @FechaFinal = :fechaFinal, @Color = :color, @EsTodoElDia = :esTodoElDia',
      {
        replacements: {
          id: body.id,
          evento: body.evento,
          fechaInicio: body.fechaInicio,
          fechaFinal: body.fechaFinal,
          color: body.color,
          esTodoElDia: body.esTodoElDia,
        },
      }
    )
    .then((resp) => {
      console.log(resp);
      return res.status(201).json({
        ok: true,
        mensaje: 'Se ha creado el evento correctamente',
      });
    });
});

//////////
// Put
//////////
app.put('/:id', (req, res) => {
  var body = req.body;
  var id = req.params.id;

  db.sequelize
    .query(
      'EXEC dbo.ActualizarEventoAgenda  @Evento = :evento, @FechaInicio = :fechaInicio, @FechaFinal = :fechaFinal, @Color = :color, @EsTodoElDia = :esTodoElDia, @IdDoctor = :id, @IdAgenda = :idagenda',
      {
        replacements: {
          id: id,
          idagenda: body.idagenda,
          evento: body.evento || null,
          fechaInicio: body.fechaInicio || null,
          fechaFinal: body.fechaFinal || null,
          color: body.color || null,
          esTodoElDia: body.esTodoElDia || null,
        },
      }
    )
    .then((resp) => {
      console.log(resp);
      return res.status(200).json({
        ok: true,
        mensaje: 'Se ha actualizado el evento correctamente',
      });
    });
});

module.exports = app;
