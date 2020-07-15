var express = require('express');
var db = require('../Data/database');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../Data/config').SEED;

var app = express();

app.post('/', (req, res) => {
  var body = req.body;

  if (!body.correo) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Por favor ingrese un correo válido',
    });
  }

  if (!body.contrasena) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Por favor ingrese la contraseña',
    });
  }

  db.sequelize
    .query('EXEC dbo.AutorizarLoginDoctor  @Correo = :correo', {
      replacements: { correo: body.correo },
    })
    .then((doctorDB) => {
      console.log(doctorDB[1]);
      if (doctorDB[1] === 0) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Credenciales incorrectas - email',
        });
      }

      if (!bcrypt.compareSync(body.contrasena, doctorDB[0][0].Contrasena)) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Credenciales incorrectas - password',
          //errors: err,
        });
      }

      doctorDB[0][0].Contrasena = ':)';
      // Crear token
      //jwt.sign({ payload: payload }, 'seed', {expiresIn: expiracion,});
      var token = jwt.sign({ doctor: doctorDB[0][0] }, SEED, {
        expiresIn: 14400,
      });

      return res.status(200).json({
        ok: true,
        mensaje: 'Login correcto',
        doctor: doctorDB[0][0],
        token: token,
      });
    });
});

module.exports = app;
