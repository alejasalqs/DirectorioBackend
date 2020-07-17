/*

  Ruta: /api/doctores/experiencias

*/
const { Router } = require('express');
const { crearExperiencia, actualizarExperiencia, eliminarExperiencia } = require('../Controladores/experiencia.controller');

const router = Router();

//////////
// Post
//////////
router.post('/', async (req, res) => {
    var body = req.body;
  
    if(body.puesto === "" || body.puesto === null || body.puesto === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el puesto que desempeñó"
      });
    }
  
    if(body.fechainicial === "" || body.fechainicial === null || body.fechainicial === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar la fecha inicial del puesto que desempeñó"
      });
    }
  
    if(body.doctorid === "" || body.doctorid === null || body.doctorid === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el id del doctor al que desea añadir una experiencia"
      });
    }
  
    try {
        const data = await crearExperiencia(body);
        
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
router.put('/:experienciasid/doctor/:doctorid', async (req, res) => {
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
router.delete('/:experienciasid/doctor/:doctorid', async (req, res) => {
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