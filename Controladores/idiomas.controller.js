const db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');

const crearIdioma = async (objeto) => {
  const data = await storeProcedure('CrearNuevoIdioma', objeto);
    
  return data[0];
}

const actualizarIdioma = async (params, objeto) => {
  objeto.ididioma =  params.ididioma;
  objeto.IdDoctor = params.IdDoctor;
  const data = await storeProcedure('ActualizarIdioma', objeto)
    
  return data[0];
} 

const eliminarIdioma = async (params) => {
  const data = await storeProcedure('EliminarIdioma', params)
    
  return data[0];
} 

module.exports = {
    crearIdioma,
    actualizarIdioma,
    eliminarIdioma
}