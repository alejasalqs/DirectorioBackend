/*

  Ruta: /api/agenda

*/
const { Router } = require('express');
const { obtenerEventosAgenda, actualizarEventoAgenda, agregarEventoAgenda } = require('../Controladores/agenda.controller');

const router = Router();

//////////
// Get
//////////
router.get('/:id', async (req, res) => {
  var id = req.params.id;
  
  try {
    const data = await obtenerEventosAgenda(id);
    
    return res.status(200).json({ 
      ok: true,
      eventos: data
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
    const data = await agregarEventoAgenda(body);
    
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
  var body = req.body;
  var id = req.params.id;

  try {
    const data = await actualizarEventoAgenda(id,body);
    
    return res.status(200).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: 'Error al recuperar la información',
      errors: error
    });
  }
});

module.exports = router;
