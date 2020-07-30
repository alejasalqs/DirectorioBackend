/*

  Ruta: /api/auth

*/
const { Router } = require('express');
const { autenticaLogin } = require('../Controladores/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');

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

module.exports = router;
