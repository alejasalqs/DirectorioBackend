const db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils')

const crearEspecialidad = async (objecto) => {
  const data = await storeProcedure('CrearNuevaEspecialidad',objecto)
    
  return data[0];
}

const actualizarEspecialidad = async (params,objeto) => {
  const { descripcion} = objeto
  const { idespecialidad, doctorid } = params

  const data = await storeProcedure('ActualizarEspecialidades', {IdEspecialiad: idespecialidad, IdDoctor: doctorid, Descripcion: descripcion })
      
  return data[0];
} 

const eliminarEspecialidad = async (params) => {
  const data = await storeProcedure('EliminarEspecialidad', params);
  
  return data[0];
} 

module.exports = {
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
}