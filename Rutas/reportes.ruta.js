/*

  Ruta: /api/resportes

*/
const { Router } = require('express');
const { reportesIniciales, topDoctores } = require('../Controladores/reportes.controller');
const { validarJWT, verificarToken } = require('../middlewares/jwt.middleware');

const router = Router();

router.post('/', async (req, res, next) => {
    const body = req.body;

    const reportes = await reportesIniciales(body.IdDoctor);

    return res.json({
        ok:true,
        reportes: reportes[0]
    })
});

router.get('/topDoctores', async (req, res, next) => {

  const doctores = await topDoctores();

  return res.json({
      ok:true,
      doctores
  })
});

module.exports = router;