/*

  Ruta: /api/doctores/especialidades

*/
const { Router } = require('express');
const { crearEspecialidad, actualizarEspecialidad, eliminarEspecialidad } = require('../Controladores/especialidades.controller');
const { validarJWT } = require('../middlewares/jwt.middleware');
const { validarCampos } = require('../middlewares/fieldValidator.middleware')
const { check } = require('express-validator');

const router = Router();

//////////
// Post
//////////
router.post('/',
[
  check('IdDoctor', 'El campo IdDoctor es obligatorio').not().isEmpty(),
  check('IdDoctor', 'El campo IdDoctor debe ser un identificador tipo INT válido').isNumeric(),
  check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
  validarCampos,
  validarJWT
],
 async (req, res, next) => {
    console.log('\x1b[36m%s\x1b[0m','POST /api/doctores/especialidades')
    var body = req.body;

    try {
        const data = await crearEspecialidad(body);
        
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
router.put('/:idespecialidad/doctor/:doctorid',
[
  check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
  validarCampos,
  validarJWT
], 
async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/especialidades')
    var body = req.body;
    var params = req.params;

    try {
        const data = await actualizarEspecialidad(params,body);
        
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
router.delete('/:idespecialidad/doctor/:IdDoctor',validarJWT,async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','DELETE /api/doctores/especialidades')
    var params = req.params;
  
    try {
        const data = await eliminarEspecialidad(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
  });

  
module.exports = router;