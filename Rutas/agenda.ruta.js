/*

  Ruta: /api/agenda

*/
const { Router } = require('express');
const { obtenerEventosAgenda, actualizarEventoAgenda, agregarEventoAgenda,llenarDatosAgenda,insertarDetalleEvento, obtenerEventosAgendados } = require('../Controladores/agenda.controller');
const { validarJWT, verificarToken } = require('../middlewares/jwt.middleware');

const router = Router();

//////////
// Get
//////////
router.get('/:id', [verificarToken], async (req, res) => {
  var id = req.params.id;  
  try {
    let data;
    if(req.enviarAgendado === 1){
      data = await obtenerEventosAgendados(id);
    } else {
      data = await obtenerEventosAgenda(id);
    }
    
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
router.post('/llenardatos',[validarJWT], async (req, res) => {
  var body = req.body;

  try {
    const data = await llenarDatosAgenda(body);
    
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
  console.log('\x1b[36m%s\x1b[0m','GET /api/agenda/' + id)

  try {
    const data = await actualizarEventoAgenda(id, body.IdDoctor);

    const detail = await insertarDetalleEvento(id,body);
    
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
