/*

  Ruta: /api/doctores/idiomas

*/
const { Router } = require('express');
const { crearIdioma, actualizarIdioma, eliminarIdioma } = require('../Controladores/idiomas.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');
const { validarJWT } = require('../middlewares/jwt.middleware');

const router = Router();

//////////
// Post
//////////
router.post('/',[
  check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
  check('IdDoctor', 'El campo IdDoctor es obligatorio').not().isEmpty().isNumeric(),
  check('IdDoctor', 'El campo IdDoctor debe ser un identificador tipo INT válido').isNumeric(),
  validarCampos,
  validarJWT
],async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','POST /api/doctores/idiomas')
    var body = req.body;

    try {
        const data = await crearIdioma(body);
        
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
router.put('/:IdIdioma/doctor/:IdDoctor',validarJWT, async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/idiomas')
    var body = req.body; 
    var params = req.params;
  
    try {
        const data = await actualizarIdioma(params,body);
        
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
router.delete('/:ididioma/doctor/:IdDoctor',validarJWT, async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','DELETE /api/doctores/idiomas')
    var params = req.params;

    try {
        const data = await eliminarIdioma(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        next(error)
      }
});

module.exports = router;