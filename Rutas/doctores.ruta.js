/*

  Ruta: /api/doctores

*/
const { Router } = require('express');
const { obtenerDoctores, obtenerDoctorPorID, crearDoctor,actualizarDoctor, eliminarDoctor } = require('../Controladores/doctores.controller');

const router = Router();

//////////
// Get
//////////
router.get('/', async (req, res) => {
  try {
    console.log(req.query)
    const data = await obtenerDoctores(req.query);
    
    return res.status(200).json({
      ok: true,
      doctores: data
    });
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al recuperar la información',
      errors: error
    });
  }
});

//////////
// Get/:id
//////////
router.get('/:id', async (req, res) => {
  var id = req.params.id;
  try {
    const data = await obtenerDoctorPorID(id);
    
    return res.status(200).json({
      ok: true,
      doctor: data
    });
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al recuperar la información',
      errors: error
    });
  }
});

//////////
// Post
//////////
router.post('/', async (req, res) => {
  var body = req.body;

  try {
    const data = await crearDoctor(body);
    
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
router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var body = req.body;

  try {
    const data = await actualizarDoctor(id,body);
    
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
router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  try {
    const data = await eliminarDoctor(id);
    
    return res.status(200).json({
      ok: true,
      mensaje: data
    });
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al realizar la operación',
      errors: error
    });
  }
});

module.exports = router;
