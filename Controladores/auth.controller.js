const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../Data/config').SEED;
const { parseStringToJson, generarStringRandom } = require('../Utilidades/string.utils');
const { storeProcedure } = require('../Utilidades/db.utils');
const { generarJWT } = require('../Helpers/jwt.helpers');
const { enviarEmail, enviarEmailCambioContrasena } = require('../Helpers/email.helpers');

const autenticaLogin = async (objeto) => {
  const { correo, contrasena } = objeto
 
  try{
    let data = await storeProcedure('AutorizarLoginDoctor', { Correo: correo });

    if (data.length === 0) {
      return {
        ok: false,
        mensaje: 'Credenciales incorrectas - email',
      };
    }

    data = await parseStringToJson(data[0])

    validPassword = bcrypt.compareSync(contrasena,data.Contrasena)
  
    if (!validPassword) {
      return {
        ok: false,
        mensaje: 'Credenciales incorrectas - password',
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
    throw new Error(error);
  }
}


const cambiarContraseña = async (objeto) => {
  let { Correo, Contrasena, NuevaContrasena } = objeto;
  try {

    let usuario = await storeProcedure('AutorizarLoginDoctor', {Correo: Correo });

    let validPassword = bcrypt.compareSync(Contrasena,usuario[0].Contrasena)

    if(!validPassword){
      return {
        ok: false,
        mensaje: 'La contraseña ingresada es incorrecta',
      };
    }

    const salt = bcrypt.genSaltSync();
    NuevaContrasena = bcrypt.hashSync(NuevaContrasena,salt);

    let data = await storeProcedure('ActualizarContrasena', { NuevaContrasena : NuevaContrasena, Correo: Correo });

    return {
      ok: true,
      mensaje: 'Se ha cambiado la contraseña éxitosamente'
    }
  }catch (error) {
    throw new Error(error);
  }
}

const recuperarContrasena = async (correo) => {
  let Correo = correo;
  try {
    let usuario = await storeProcedure('AutorizarLoginDoctor', { Correo });

    if(usuario.length === 0){
      return {
        ok: false,
        mensaje: 'El correo ingresado no existe',
      };
    }

    let nuevaContrasena = await generarStringRandom(8);

    const salt = bcrypt.genSaltSync();
    nuevaContrasenaEncriptar = bcrypt.hashSync(nuevaContrasena,salt);

    let data = await storeProcedure('ActualizarContrasena', { NuevaContrasena : nuevaContrasenaEncriptar, Correo });

    let correo = await enviarEmail({nuevaContrasena},"cambioContrasena","Cambio en la contraseña del sistema Argus-salud", Correo);

    return {
      ok: true,
      mensaje: 'Se le ha generado correctamente una contraseña temporal, por favor revise su correo para tener más información',
      contrasenaTemp: nuevaContrasena
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
    autenticaLogin,
    cambiarContraseña,
    recuperarContrasena
}