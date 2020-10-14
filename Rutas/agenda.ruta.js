/*

  Ruta: /api/agenda

*/
const { Router } = require('express');
const { obtenerEventosAgenda, actualizarEventoAgenda, agregarEventoAgenda,llenarDatosAgenda,insertarDetalleEvento, obtenerEventosAgendados, configurarDiasLaborales, obtenerDetalleEventosAgenda, cancelarCitaAgenda, configurarHoras, obtenerHoras, obtenerDiasLaborales, eliminarHoras } = require('../Controladores/agenda.controller');
const { validarJWT, verificarToken } = require('../middlewares/jwt.middleware');
const { darFormatoFechaDDMMYYYY } = require('../Utilidades/fechas.utils');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');

const router = Router();

//////////
// Get
//////////
router.get('/:id', [verificarToken], async (req, res, next) => {
  var id = req.params.id;
  console.log('\x1b[36m%s\x1b[0m','GET /api/agenda/' + id)  
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
    next(error);
  }
});


router.get('/detalle/:id',[verificarToken], async (req, res) => {
  const id = req.params.id;

  const data = await obtenerDetalleEventosAgenda(id);

  return res.status(200).json({ 
    ok: true,
    detalle: data
  });
});


router.get('/diaslaborales/:id',[verificarToken], async (req, res) => {
  const id = req.params.id;

  const data = await obtenerDiasLaborales(id);

  return res.status(200).json({ 
    ok: true,
    dias: data
  });
});


router.get('/horas/:id',[verificarToken], async (req, res) => {
  const id = req.params.id;

  const data = await obtenerHoras(id);

  return res.status(200).json({ 
    ok: true,
    horas: data
  });
});

//////////
// Post
//////////
router.post('/llenardatos',[
  verificarToken,
  check('FechaInicial','El campo Fecha Inicial es obligatorio').not().isEmpty(),
  check('FechaFinal','El campo Fecha Final es obligatorio').not().isEmpty(),
  check('HorasLaborales','El campo Horas Laborales es obligatorio').not().isEmpty(),
  validarCampos
], async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','POST /api/agenda/llenardatos')
  var body = req.body;
  try {

    let data;// = await darFormatoFechaDDMMYYYY(body);
    
    data = await llenarDatosAgenda(body);
    
    return res.status(201).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error);
  }
});

//////////
// Post
//////////
router.post('/', async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/agenda')
  var body = req.body;

  try {
    const data = await agregarEventoAgenda(body);
    
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
router.put('/:id',[
  check('Nombre','El campo nombre es campo obligatorio').not().isEmpty(),
  check('Apellidos','El campo Apellidos es campo obligatorio').not().isEmpty(),
  check('Correo','El campo Correo es campo obligatorio').not().isEmpty(),
  check('Correo','El campo Correo debe ser un correo válido').isEmail(),
  check('MotivoCita','El campo Motivo cita es campo obligatorio').not().isEmpty(),
  check('Celular','El campo Celular es campo obligatorio').not().isEmpty(),
  check('Celular','El campo Celular debe ser un número de teléfono válido').isNumeric(),
  check('Celular','El campo Celular debe tener un largo de 8 o más números').isLength({ min: 8, max:12 }),
  check('Cedula','El campo Cedula es campo obligatorio').not().isEmpty(),
  validarCampos
],async (req, res, next) => {
  var body = req.body;
  var id = req.params.id;
  console.log('\x1b[36m%s\x1b[0m','PUT /api/agenda/' + id)

  try {
    const data = await actualizarEventoAgenda(id, body.IdDoctor);

    const detail = await insertarDetalleEvento(id,body);
    
    return res.status(200).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Post
//////////
router.post('/dias', [verificarToken], async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/agenda/dias')
  var body = req.body;

  try {
    const data = await configurarDiasLaborales(body);
    
    return res.status(201).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Post
//////////
router.post('/configurarhoras', [
  verificarToken,
  check('Descripcion','El campo Descripcion es campo obligatorio').not().isEmpty(),
  check('HoraInicial','El campo HoraInicial es campo obligatorio').not().isEmpty(),
  check('HoraFinal','El campo HoraFinal es campo obligatorio').not().isEmpty(),
  validarCampos
], async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','PUT /api/agenda/configurarhoras')
  const { idDoctor, Descripcion, HoraInicial, HoraFinal } = req.body;

  try {
    const data = await configurarHoras(idDoctor, Descripcion, HoraInicial, HoraFinal);
    
    return res.status(201).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Post
//////////
router.delete('/:id', [verificarToken], async (req, res, next) => {
  const id = req.params.id;
  console.log('\x1b[36m%s\x1b[0m','DELETE /api/agenda/' + id)
  var body = req.body;

  try {
    const data = await cancelarCitaAgenda(id);
    
    return res.status(200).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Post
//////////
router.delete('/horas/:idDoctor/:idHora', [verificarToken], async (req, res, next) => {
  const idDoctor = req.params.idDoctor;
  const idHora = req.params.idHora;
  console.log('\x1b[36m%s\x1b[0m','DELETE /api/agenda/horas' + idDoctor)
  var body = req.body;

  try {
    const data = await eliminarHoras(idDoctor, idHora);
    
    return res.status(200).json({ 
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

module.exports = router;
