const db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');
const { darFormatoFechaDDMMYYYY } = require('../Utilidades/fechas.utils')

const crearEstudio = async(objeto) => {

  console.log(objeto)
  objeto = await darFormatoFechaDDMMYYYY(objeto);
  console.log(objeto)

  const data = await storeProcedure('CrearNuevoEstudio',objeto);
    
 return data[0];
}

const actualizarEstudio = async(params,objeto) => {
  objeto.IdDoctor = params.IdDoctor;
  objeto.IdEstudio = params.IdEstudio;

  const data = await storeProcedure('ActualizarEstudios', objeto)
    
  return data[0];
}

const eliminarEstudio = async(params) => {
  const data = await storeProcedure('EliminarEstudio',params);
    
  return data[0];
}

module.exports = {
    crearEstudio,
    actualizarEstudio,
    eliminarEstudio
}