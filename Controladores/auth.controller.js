const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../Data/config').SEED;
const { parseStringToJson } = require('../Utilidades/string.utils');
const { storeProcedure } = require('../Utilidades/db.utils');
const { generarJWT } = require('../Helpers/jwt.helpers');

const autenticaLogin = async (objeto) => {
  const { correo, contrasena } = objeto
 
  try{
    let data = await storeProcedure('AutorizarLoginDoctor', { Correo: correo });

    data = await parseStringToJson(data[0])

    if (data[1] === 0) {
      return {
        ok: false,
        mensaje: 'Credenciales incorrectas - email',
      };
    }

    validPassword = bcrypt.compareSync(contrasena,data.Contrasena)
  
    if (!validPassword) {
      return {
        ok: false,
        mensaje: 'Credenciales incorrectas - password',
        //errors: err,
      };
    }
  
    const token = await generarJWT(data.IdDoctor)
  
    return {
      ok: true,
      mensaje: 'Login correcto',
      doctor: data,
      token,
    };
  }catch(error){
    console.log(error);
  }
}

module.exports = {
    autenticaLogin
}