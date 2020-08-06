var db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');
const { darFormatoFechaDDMMYYYY } = require('../Utilidades/fechas.utils');
const { enviarEmail } = require('../Helpers/email.helpers');

/**
   * Obtiene todos los eventos de la agenda de un doctor especificado por ID.
   * 
   * 
   * @param {int} id (Obligatorio) ID del doctor a consultar.
   * 
   */
const obtenerEventosAgenda = async (id) => {
    let data = await storeProcedure('ObtenerEventosAgenda', { IdDoctor: id })
    
    data = await darFormatoFechaDDMMYYYY(data);

    return data;
}


/**
   * Obtiene todos los eventos de la agenda de un doctor especificado por ID.
   * 
   * 
   * @param {int} id (Obligatorio) ID del doctor a consultar.
   * 
   */
  const obtenerEventosAgendados = async (id) => {
    let data = await storeProcedure('ObtenerEventosAgendados', { IdDoctor: id })
    
    data = await darFormatoFechaDDMMYYYY(data);

    return data;
}

const llenarDatosAgenda = async (objeto) => {

  let data = await darFormatoFechaDDMMYYYY(objeto);
  
  data = await storeProcedure('LlenarFechas', objeto);
    
  return data[0];
}

const agregarEventoAgenda = async (objeto) => {
  const data = await storeProcedure('AgregarEventoAgenda', objeto)
    
  return data[0];
}

const actualizarEventoAgenda = async (id,objeto) => {

  const data = await storeProcedure('ActualizarEventoAgenda',{IdAgenda: id, IdDoctor : objeto })

  const correo = await enviarEmail({
    Destinatario: 'alesalgueroq1223@gmail.com',
    Asunto: 'Agendación de cita',
    Informacion: 'Test de envio de correo'
  })
    
  return data[0];
}

const insertarDetalleEvento = async (id,objeto) => {
  objeto.IdAgenda = id;
  delete objeto.IdDoctor;
  const data = await storeProcedure('InsertarDetalleEvento',objeto)
    
  return data[0];
}

module.exports = {
    obtenerEventosAgenda,
    agregarEventoAgenda,
    actualizarEventoAgenda,
    llenarDatosAgenda,
    insertarDetalleEvento,
    obtenerEventosAgendados
}