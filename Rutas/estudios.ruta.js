/*

  Ruta: /api/doctores/estudios

*/
const { Router } = require('express');
const { crearEstudio, actualizarEstudio, eliminarEstudio  } = require('../Controladores/estudios.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');
const { validarJWT } = require('../middlewares/jwt.middleware');

const router = Router();

//////////
// Post
//////////
router.post('/',[
  validarJWT,
  check('Grado','El campo grado es campo obligatorio').not().isEmpty(),
  check('FechaInicial','El campo FechaInicial es campo obligatorio').not().isEmpty(),
  check('IdDoctor','El campo IdDoctor es campo obligatorio').not().isEmpty(),
  validarCampos
],async (req, res, next) => {
    console.log('\x1b[36m%s\x1b[0m','POST /api/doctores/estudios')
    var body = req.body;
  
    try {
        const data = await crearEstudio(body);
        
        return res.status(201).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
  });
  
  //////////
  // Put
  //////////
  router.put('/:IdEstudio/doctor/:IdDoctor',validarJWT, async (req, res, next) => {
    console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/estudios')
    var body = req.body;
    var params = req.params;
  
    try {
        const data = await actualizarEstudio(params,body);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
  });

  //////////
  // Delete
  //////////
  router.delete('/:IdEstudio/doctor/:IdDoctor', validarJWT,async (req, res, next) => {
    console.log('\x1b[36m%s\x1b[0m','DELETE /api/doctores/estudios')
    var params = req.params;
  
    try {
        const data = await eliminarEstudio(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
  });

module.exports = router;