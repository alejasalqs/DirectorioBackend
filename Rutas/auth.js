/*

  Ruta: /api/auth

*/
const { Router } = require('express');
const { autenticaLogin, cambiarContraseña, recuperarContrasena } = require('../Controladores/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');
const { storeProcedure } = require('../Utilidades/db.utils');

const router = Router();

router.post('/login',[
  check('correo','El campo correo es obligatorio').not().isEmpty(),
  check('correo','El campo correo debe ser un correo válido').isEmail(),
  check('contrasena','El campo contraseña es obligatorio').not().isEmpty(),
  validarCampos
],async (req, res) => {
  var body = req.body;

  try {
    const data = await autenticaLogin(body);

    if(data.ok){
      return res.status(200).json(data);
    } else {
      return res.status(401).json(data);
    }
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al validar los datos',
      errors: error
    });
  }
});

router.post('/cambiarcontrasena',[
  check('Correo','El campo correo es obligatorio').not().isEmpty(),
  check('Correo','El campo correo debe ser un correo válido').isEmail(),
  check('Contrasena','El campo contraseña es obligatorio').not().isEmpty(),
  check('NuevaContrasena','El campo contraseña es obligatorio').not().isEmpty(),
  validarCampos
],async (req, res) => {
  var body = req.body;

  try {
    const data = await cambiarContraseña(body);

    if(data.ok){
      return res.status(200).json(data);
    } else {
      return res.status(400).json(data);
    }
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al validar los datos',
      errors: error
    });
  }
});

router.post('/recuperarcontrasena',[
  check('Correo','El campo correo es obligatorio').not().isEmpty(),
  check('Correo','El campo correo debe ser un correo válido').isEmail(),
  validarCampos
],async (req, res) => {
  var body = req.body;

  try {
    const data = await recuperarContrasena(body.Correo);

    if(data.ok){
      return res.status(200).json(data);
    } else {
      return res.status(400).json(data);
    }
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al validar los datos',
      errors: error
    });
  }
});

router.post('/ultimoingreso', async (req, res) => {
  const data = await storeProcedure('ActualizarUltimoIngreso',{Correo: req.body.Correo});

  return res.json({ok: true});
});

module.exports = router;
