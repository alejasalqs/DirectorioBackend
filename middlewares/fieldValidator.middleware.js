const { validationResult } = require('express-validator');

const validarCampos = async (req ,res, next) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        console.log('\x1b[31m%s\x1b[0m', '[ERROR] Campos requeridos no fueron enviados')
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {validarCampos}