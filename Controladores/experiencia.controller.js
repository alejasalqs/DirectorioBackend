const db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');


const crearExperiencia = async (objeto) => {
  const data = await storeProcedure('CrearNuevaExperiencia',objeto);
    
  return data[0];
}

const actualizarExperiencia = async (params, objeto) => {
  objeto.IdDoctor = params.IdDoctor;
  objeto.IdExperiencia = params.IdExperiencia;
  const data = await storeProcedure('ActualizarExperiencia', objeto)
    
  return data[0];
}

const eliminarExperiencia = async (params) => {
  const data = await storeProcedure('EliminarExperiencia', params)
    
  return data[0];
}

module.exports = {
    crearExperiencia,
    actualizarExperiencia,
    eliminarExperiencia
}