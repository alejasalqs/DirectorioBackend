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
        return res.status(401).json({
            ok:false,
            mensaje: 'Token no válido'
        })
    }
}

const verificarToken = async (req, res, next) => {
    const token = req.header('x-token');

    try {
        const { id } = jwt.verify(token, SEED);
        req.enviarAgendado = 1;
        next();
    } catch (error) {
        req.enviarAgendado = 0;
        next();
    }
} 

module.exports = {
    validarJWT,
    verificarToken
}