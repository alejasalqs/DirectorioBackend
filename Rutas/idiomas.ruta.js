/*

  Ruta: /api/doctores/idiomas

*/
const { Router } = require('express');
const { crearIdioma, actualizarIdioma, eliminarIdioma } = require('../Controladores/idiomas.controller');

const router = Router();

//////////
// Post
//////////
router.post('/', async (req, res) => {
    var body = req.body;
  
    if(body.descripcion === "" || body.descripcion === null || body.descripcion === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el idioma"
      });
    }
  
    if(body.doctorid === "" || body.doctorid === null || body.doctorid === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el id del doctor al que desea añadir un idioma"
      });
    }
  
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
router.put('/:ididioma/doctor/:doctorid', async (req, res) => {
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
router.delete('/:ididioma/doctor/:doctorid', async (req, res) => {
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