var db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');

/**
   * Obtiene todos los eventos de la agenda de un doctor especificado por ID.
   * 
   * 
   * @param {int} id (Obligatorio) ID del doctor a consultar.
   * 
   */
const obtenerEventosAgenda = async (id) => {
    let data = await storeProcedure('ObtenerEventosAgenda', { IdDoctor: id })
    
    return data;
}

const agregarEventoAgenda = async (objeto) => {
  const data = await storeProcedure('AgregarEventoAgenda', objeto)
    
  return data[0];
}

const actualizarEventoAgenda = async (id, objeto) => {

  const data = await storeProcedure('ActualizarEventoAgenda',objeto)
    
   return data[0];
}

module.exports = {
    obtenerEventosAgenda,
    agregarEventoAgenda,
    actualizarEventoAgenda
}