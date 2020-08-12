/*

  Ruta: /api/doctores/experiencias

*/
const { Router } = require('express');
const { crearExperiencia, actualizarExperiencia, eliminarExperiencia } = require('../Controladores/experiencia.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');
const { validarJWT } = require('../middlewares/jwt.middleware');
const router = Router();

//////////
// Post
//////////
router.post('/',[
  validarJWT,
  check('Puesto','El campos Puesto es un campo obligatorio').not().isEmpty(),
  check('FechaInicial','El campos FechaInicial es un campo obligatorio').not().isEmpty(),
  check('IdDoctor','El campos IdDoctor es un campo obligatorio').not().isEmpty(),
  validarCampos
],async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','POST /api/doctores/experiencias')
    var body = req.body;
  
    try {
        const data = await crearExperiencia(body);
        
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
router.put('/:IdExperiencia/doctor/:IdDoctor',validarJWT, async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/experiencias')
    var body = req.body;
    var params = req.params;
  
  
    try {
        const data = await actualizarExperiencia(params,body);
        
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
router.delete('/:IdExperiencia/doctor/:IdDoctor',validarJWT, async (req, res, next) => {
    console.log('\x1b[36m%s\x1b[0m','DELETE /api/doctores/experiencias')
    var params = req.params;

    try {
        const data = await eliminarExperiencia(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
});

module.exports = router;