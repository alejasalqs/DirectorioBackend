/*

  Ruta: /api/doctores

*/
const { Router } = require('express');
const { obtenerDoctores, obtenerDoctorPorID, crearDoctor,actualizarDoctor, eliminarDoctor,obtenerNombreDoctores } = require('../Controladores/doctores.controller');
const { validarJWT } = require('../middlewares/jwt.middleware');
const { validarCampos } = require('../middlewares/fieldValidator.middleware');
const { check } = require('express-validator');

const router = Router();

//////////
// Get
//////////
router.get('/', async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','GET /api/doctores')
  try {
    const data = await obtenerDoctores(req.query);
    
    return res.status(200).json({
      ok: true,
      doctores: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Get
//////////
router.get('/nombres', async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','GET /api/doctores/nombres')
  try {
    const data = await obtenerNombreDoctores();
    
    return res.status(200).json({
      ok: true,
      doctores: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Get/:id
//////////
router.get('/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log('\x1b[36m%s\x1b[0m','GET /api/doctores/' + id)
  try {
    const data = await obtenerDoctorPorID(id);
    
    return res.status(200).json({
      ok: true,
      doctor: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Post
//////////
router.post('/',[
  check('Nombre','El campo nombre es obligatorio').not().isEmpty(),
  check('PrimerApellido','El campo Prime rApellido es obligatorio').not().isEmpty(),
  check('Correo','El campo Correo es obligatorio').not().isEmpty(),
  check('FechaNacimiento','El campo Fecha de Nacimiento es obligatorio').not().isEmpty(),
  check('Celular','El campo Celular es obligatorio').not().isEmpty(),
  check('Locacion','El campo Locacion es obligatorio').not().isEmpty(),
  check('Titulo','El campo Titulo es obligatorio').not().isEmpty(),
  validarCampos
], async (req, res, next) => {
  console.log('\x1b[36m%s\x1b[0m','POST /api/doctores')
  var body = req.body;

  try {
    const data = await crearDoctor(body);
    
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
router.put('/:id', [
  validarJWT,
  check('Nombre','El campo nombre es obligatorio').not().isEmpty(),
  check('PrimerApellido','El campo Prime rApellido es obligatorio').not().isEmpty(),
  check('Correo','El campo Correo es obligatorio').not().isEmpty(),
  check('FechaNacimiento','El campo Fecha de Nacimiento es obligatorio').not().isEmpty(),
  check('Celular','El campo Celular es obligatorio').not().isEmpty(),
  check('Locacion','El campo Locacion es obligatorio').not().isEmpty(),
  check('Titulo','El campo Titulo es obligatorio').not().isEmpty(),
  validarCampos
], async (req, res, next) => {
  var id = req.params.id;
  var body = req.body;
  console.log('\x1b[36m%s\x1b[0m','PUT /api/doctores/' + id)
  console.log(body)

  try {
    const data = await actualizarDoctor(id,body);
    
    return res.status(200).json({
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

//////////
// Delete
//////////
router.delete('/:id', validarJWT, async (req, res, next) => {
  var id = req.params.id;
  console.log('\x1b[36m%s\x1b[0m','DELETE /api/doctores/' + id)
  try {
    const data = await eliminarDoctor(id);
    
    return res.status(200).json({
      ok: true,
      mensaje: data
    });
  }catch (error) {
    next(error)
  }
});

module.exports = router;
