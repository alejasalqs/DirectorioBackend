/*

  Ruta: /api/doctores/especialidades

*/
const { Router } = require('express');
const { crearEspecialidad, actualizarEspecialidad, eliminarEspecialidad } = require('../Controladores/especialidades.controller');

const router = Router();

//////////
// Post
//////////
router.post('/', async (req, res) => {
    var body = req.body;
  
    if(body.descripcion === "" || body.descripcion === null || body.descripcion === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar la especialidad"
      });
    }
  
    if(body.doctorid === "" || body.doctorid === null || body.doctorid === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar el id del doctor al que desea añadir una especialidad"
      });
    }

    try {
        const data = await crearEspecialidad(body);
        
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
router.put('/:idespecialidad/doctor/:doctorid', async (req, res) => {
    var body = req.body;
    var params = req.params;
  
    if(body.descripcion === "" || body.descripcion === null || body.descripcion === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: "Debe ingresar la especialidad"
      });
    }
  
    try {
        const data = await actualizarEspecialidad(params,body);
        
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
router.delete('/:idespecialidad/doctor/:doctorid',async (req, res) => {
    var params = req.params;
  
    try {
        const data = await eliminarEspecialidad(params);
        
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