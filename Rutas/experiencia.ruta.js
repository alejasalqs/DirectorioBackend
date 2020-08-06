/*

  Ruta: /api/doctores/experiencias

*/
const { Router } = require('express');
const { crearExperiencia, actualizarExperiencia, eliminarExperiencia } = require('../Controladores/experiencia.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware')
const router = Router();

//////////
// Post
//////////
router.post('/',[
  check('Puesto','El campos Puesto es un campo obligatorio').not().isEmpty(),
  check('FechaInicial','El campos FechaInicial es un campo obligatorio').not().isEmpty(),
  check('IdDoctor','El campos IdDoctor es un campo obligatorio').not().isEmpty(),
  validarCampos
],async (req, res) => {
    var body = req.body;
  
    try {
        const data = await crearExperiencia(body);
        
        return res.status(201).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        console.log(error);
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
router.put('/:IdExperiencia/doctor/:IdDoctor', async (req, res) => {
    var body = req.body;
    var params = req.params;
  
  
    try {
        const data = await actualizarExperiencia(params,body);
        
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
router.delete('/:IdExperiencia/doctor/:IdDoctor', async (req, res) => {
    var params = req.params;

    try {
        const data = await eliminarExperiencia(params);
        
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

module.exports = router;