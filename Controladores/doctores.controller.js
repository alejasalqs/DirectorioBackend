const db = require('../Data/database');
const { parseStringToJson } = require('../Utilidades/string.utils')
var bcrypt = require('bcryptjs');
const { storeProcedure } = require('../Utilidades/db.utils');
const { darFormatoFechaDDMMYYYY } = require('../Utilidades/fechas.utils');

  /**
   * Obtiene todos los doctores de la tabla doctores.
   * 
   * 
   * @param {Object} parametros (Opcional) Parametros para filtrar sobre los resultados.
   * 
   * 
   * @example (Termino) = Obtiene los doctores de un termino en especifico: Dentista, Ginecologo, Oncologo ...
   *  (Genero) = Obtiene los doctores filtrando sobre su genero.
   *  (Locacion) = Obtiene los doctores de una localidad especifica ...
   */
const obtenerDoctores = async (objeto) => {

  let data = await storeProcedure('ObtenerDoctores', objeto);

  data = await parseStringToJson(data);

  return data;
}

const obtenerNombreDoctores = async () => {

  let data = await storeProcedure('ObtenerNombreDoctores');

  data = await parseStringToJson(data);

  return data;
}

/**
   * Obtiene el doctor con el ID especificado.
   * 
   * 
   * @param {int} id (Obligatorio) ID del doctor a especificar.
   * 
   */
const obtenerDoctorPorID = async (id) => {

    let data = await storeProcedure('ObtenerDoctorID', { IdDoctor: id })
    
    data = await parseStringToJson(data[0]);
      
    return data;
}

/**
   * Crea un doctor nuevo.
   * 
   * 
   * @param {Object} objeto (Opcional) Campos necesarios para la creación del doctor nuevo.
   * 
   * 
   * @example Campos necesarios
   * 
   * "Nombre": "",
   * "PrimerApellido": "",
   * "SegundoApellido": "",
   * "Correo": "",
   * "Celular": "",
   * "Genero": 0,
   * "FechaNacimiento": "",
   * "Locacion": ""
   * 
   * 
   */
const crearDoctor = async (objeto) => {

  const salt = bcrypt.genSaltSync();
  objeto.contrasena = bcrypt.hashSync(objeto.contrasena,salt);
   
  let data = await storeProcedure('CrearNuevoDoctor', objeto);
    
  return data[0];
}

/**
   * Actualiza un doctor existente.
   * 
   * 
   * @param {Object} objeto (Opcional) Campos necesarios para la creación del doctor nuevo.
   * 
   * 
   * @example Campos necesarios
   * 
   * "Nombre": "",
   * "PrimerApellido": "",
   * "SegundoApellido": "",
   * "Correo": "",
   * "Celular": "",
   * "Genero": 0,
   * "FechaNacimiento": "",
   * "Locacion": ""
   * 
   * 
   */
const actualizarDoctor = async (id,objeto) => {
  
  objeto.DoctorID = id;

  //let data = darFormatoFechaDDMMYYYY(objeto)

  let data = await storeProcedure('ActualizarDoctorExistente', objeto);
    
  return data[0];
}

/**
   * Elimina el doctor con el ID especificado.
   * 
   * 
   * @param {int} id (Obligatorio) ID del doctor a eliminar.
   * 
   */
const eliminarDoctor = async(id) => {

  let data = await storeProcedure('EliminarDoctor', {IdDoctor : id}) 
        
    return data[0];
}

module.exports = {
    obtenerDoctores,
    obtenerDoctorPorID,
    crearDoctor,
    actualizarDoctor,
    eliminarDoctor,
    obtenerNombreDoctores
}