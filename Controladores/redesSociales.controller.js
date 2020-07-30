const db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');

const crearRedSocial = async (objeto) => {
  const data = await storeProcedure('CrearNuevaRedSocial', objeto);
    
  return data[0];
}

const actualizarRedSocial = async (params, objeto) => {
  objeto.IdRedesSociales = params.IdRedesSociales;
  objeto.IdDoctor = params.IdDoctor;
  const data = await storeProcedure('ActualizarRedesSociales', objeto)
    
  return data[0];
}

const eliminarRedSocial = async (params) => {
  const data = await storeProcedure('EliminarRedSocial', params);
    
  return data[0];
}

module.exports = {
    crearRedSocial,
    actualizarRedSocial,
    eliminarRedSocial
}