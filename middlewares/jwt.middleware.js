const jwt = require('jsonwebtoken');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');
        
    if(!token){
        return res.status(401).json({
            ok:false,
            mensaje: 'No se envío el token'
        })
    }
}

module.exports = {
    validarJWT
}