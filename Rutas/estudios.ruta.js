/*

  Ruta: /api/doctores/estudios

*/
const { Router } = require('express');
const { crearEstudio, actualizarEstudio, eliminarEstudio  } = require('../Controladores/estudios.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');

const router = Router();

//////////
// Post
//////////
router.post('/',[
  check('Grado','El campo grado es campo obligatorio').not().isEmpty(),
  check('FechaInicial','El campo FechaInicial es campo obligatorio').not().isEmpty(),
  check('IdDoctor','El campo IdDoctor es campo obligatorio').not().isEmpty(),
  validarCampos
],async (req, res) => {
    var body = req.body;
  
    try {
        const data = await crearEstudio(body);
        
        return res.status(201).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al insertar el nuevo registro',
          errors: error
        });
      }
  });
  
  //////////
  // Put
  //////////
  router.put('/:IdEstudio/doctor/:IdDoctor', async (req, res) => {
    var body = req.body;
    var params = req.params;
  
    try {
        const data = await actualizarEstudio(params,body);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al insertar el nuevo registro',
          errors: error
        });
      }
  });

  //////////
  // Delete
  //////////
  router.delete('/:IdEstudio/doctor/:IdDoctor', async (req, res) => {
    var params = req.params;
  
    try {
        const data = await eliminarEstudio(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al eliminar registro',
          errors: error
        });
      }
  });

module.exports = router;