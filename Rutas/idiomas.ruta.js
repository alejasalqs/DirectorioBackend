/*

  Ruta: /api/doctores/idiomas

*/
const { Router } = require('express');
const { crearIdioma, actualizarIdioma, eliminarIdioma } = require('../Controladores/idiomas.controller');
const { check } = require('express-validator');

const router = Router();

//////////
// Post
//////////
router.post('/',[
  check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
  check('IdDoctor', 'El campo IdDoctor es obligatorio').not().isEmpty().isNumeric(),
  check('IdDoctor', 'El campo IdDoctor debe ser un identificador tipo INT válido').isNumeric(),
],async (req, res) => {
    var body = req.body;

    try {
        const data = await crearIdioma(body);
        
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
router.put('/:ididioma/doctor/:IdDoctor', async (req, res) => {
    var body = req.body; 
    var params = req.params;
  
    if(body.descripcion === "" || body.descripcion === null || body.descripcion === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el nuevo idioma"
      });
    }
  
    try {
        const data = await actualizarIdioma(params,body);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al actualizar el registro',
          errors: error
        });
      }
});


//////////
// Delete
//////////
router.delete('/:ididioma/doctor/:IdDoctor', async (req, res) => {
    var params = req.params;

    try {
        const data = await eliminarIdioma(params);
        
        return res.status(200).json({ 
          ok: true,
          mensaje: data
        });
      }catch (error) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al eliminar el registro',
          errors: error
        });
      }
});

module.exports = router;