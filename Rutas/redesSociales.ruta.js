/*

  Ruta: /api/doctores/redesSociales

*/
const { Router } = require('express');
const { crearRedSocial, actualizarRedSocial, eliminarRedSocial  } = require('../Controladores/redesSociales.controller');

const router = Router();

//////////
// Post
//////////
router.post('/', async (req, res) => {
    var body = req.body;
  
    if(body.url === "" || body.url === null || body.url === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar la url de la red social"
      });
    }
  
    if(body.descripcion === "" || body.descripcion === null || body.descripcion === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el tipo de red social"
      });
    }
  
    if(body.doctorid === "" || body.doctorid === null || body.doctorid === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el id del doctor al que desea añadir una red social"
      });
    }
  
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
router.put('/:redsocialid/doctor/:doctorid', async (req, res) => {
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
router.delete('/:redsocialid/doctor/:doctorid', async (req, res) => {
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