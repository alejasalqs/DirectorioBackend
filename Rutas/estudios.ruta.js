/*

  Ruta: /api/doctores/estudios

*/
const { Router } = require('express');
const { crearEstudio, actualizarEstudio, eliminarEstudio  } = require('../Controladores/estudios.controller');

const router = Router();

//////////
// Post
//////////
router.post('/', async (req, res) => {
    var body = req.body;
  
    if(body.grado === "" || body.grado === null || body.grado === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el grado de estudio"
      });
    }
  
    if(body.fechainicial === "" || body.fechainicial === null || body.fechafinal === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar la fecha inicial del tiempo de estudio"
      });
    }
  
    if(body.doctorid === "" || body.doctorid === null || body.doctorid === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el id del doctor al que desea añadir un estudio"
      });
    }
  
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
  router.put('/:estudioid/doctor/:doctorid', async (req, res) => {
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
  router.delete('/:estudioid/doctor/:doctorid', async (req, res) => {
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