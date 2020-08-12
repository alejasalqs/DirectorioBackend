/*

  Ruta: /api/doctores/redesSociales

*/
const { Router } = require('express');
const { crearRedSocial, actualizarRedSocial, eliminarRedSocial  } = require('../Controladores/redesSociales.controller');
const { validarCampos } = require('../middlewares/fieldValidator.middleware')
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/jwt.middleware');

const router = Router();

//////////
// Post
//////////
router.post('/', [
  check('url', 'El campo url es obligatorio').not().isEmpty(),
  check('IdDoctor', 'El campo IdDoctor debe ser un identificador tipo INT válido').isNumeric(),
  check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
  validarCampos,
  validarJWT
], async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','POST /api/doctores/redesSociales')
    var body = req.body;
     
    try {
        const data = await crearRedSocial(body);
        
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
router.put('/:IdRedesSociales/doctor/:IdDoctor', validarJWT,async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/redesSociales')
    var body = req.body;
    var params = req.params;
  
    try {
        const data = await actualizarRedSocial(params,body);
        
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
router.delete('/:IdRedesSociales/doctor/:IdDoctor', validarJWT,async (req, res, next) => {
    console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/redesSociales')
    var params = req.params;
  
    try {
        const data = await eliminarRedSocial(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
  });

module.exports = router;