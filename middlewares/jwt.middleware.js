const jwt = require('jsonwebtoken');
const { SEED } = require('../Data/config')

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');
        
    if(!token){
        return res.status(401).json({
            ok:false,
            mensaje: 'No se envió el token'
        })
    }

    try {
        const { id } = jwt.verify(token, SEED);

        req.id = id;

        next();
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', '[ERROR] No se envió el token')
        return res.status(401).json({
            ok:false,
            mensaje: 'Token no válido'
        })
    }
}

const verificarToken = async (req, res, next) => {
    const token = req.query;

    console.log(!Object.keys(token).length === 0);

    if (Object.keys(token).length === 0) {
        req.enviarAgendado = 0;
        next();
    } else {
        req.enviarAgendado = 1;
        next();
    }
} 

module.exports = {
    validarJWT,
    verificarToken
}