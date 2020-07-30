/*

  Ruta: /api/doctores/redesSociales

*/
const { Router } = require('express');
const { crearRedSocial, actualizarRedSocial, eliminarRedSocial  } = require('../Controladores/redesSociales.controller');
const { validarCampos } = require('../middlewares/fieldValidator.middleware')
const { check } = require('express-validator');

const router = Router();

//////////
// Post
//////////
router.post('/', [
  check('url', 'El campo url es obligatorio').not().isEmpty(),
  check('IdDoctor', 'El campo IdDoctor debe ser un identificador tipo INT válido').isNumeric(),
  check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
  validarCampos
], async (req, res) => {
    var body = req.body;
     
    try {
        const data = await crearRedSocial(body);
        
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
router.put('/:IdRedesSociales/doctor/:IdDoctor', async (req, res) => {
    var body = req.body;
    var params = req.params;
  
    try {
        const data = await actualizarRedSocial(params,body);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al actualizar el nuevo registro',
          errors: error
        });
      }
});

//////////
// Delete
//////////
router.delete('/:IdRedesSociales/doctor/:IdDoctor', async (req, res) => {
    var params = req.params;
  
    try {
        const data = await eliminarRedSocial(params);
        
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