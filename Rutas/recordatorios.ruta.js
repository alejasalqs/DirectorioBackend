/*

  Ruta: /api/recordatorios

*/
const { Router } = require('express');
const { enviarRecordatorio } = require('../Controladores/recordatorios.controller')


const router = Router();

//////////
// POST
//////////
router.post('/', async (req, res, next) => {
    const body = req.body;
    
    const data = enviarRecordatorio(body);

    return res.json(data);
});

module.exports = router;