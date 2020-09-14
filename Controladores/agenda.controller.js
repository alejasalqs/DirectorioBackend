var db = require('../Data/database');
const { storeProcedure } = require('../Utilidades/db.utils');
const { darFormatoFechaDDMMYYYY } = require('../Utilidades/fechas.utils');
const { enviarEmail } = require('../Helpers/email.helpers');
const { enviarMensajeWP, enviarMensajeSMS } = require('../Helpers/whatsApp.helpers');
var moment = require('moment'); // require

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


const obtenerDetalleEventosAgenda = async (id) => {
  let data = await storeProcedure('ObtenerDetalleEvento', { IdAgenda: id })
  
  data = await darFormatoFechaDDMMYYYY(data[0]);

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

  let dias = await storeProcedure('ObtenerDiasLaborales',{ IdDoctor: objeto.IdDoctor })

  dias = dias.map(d => d.Dia.toLowerCase());

  console.log(dias)

  let inicio = moment(data.FechaInicial, 'YYYY-MM-DD HH:mm').format("YYYY-MM-DD HH:mm");
  let final = moment(data.FechaFinal, 'YYYY-MM-DD HH:mm').format("YYYY-MM-DD HH:mm");

  while(moment(inicio).isBefore(final,'day')) {
    for (let i = 1; i <= parseInt(objeto.HorasLaborales); i++) {
      finCita =  moment(inicio, "YYYY-MM-DD HH:mm").add(1, 'h').format("YYYY-MM-DD HH:mm").toString();

      if (!dias.includes(moment(inicio).locale('es').format('dddd'))) {
        break;
      }
      
      const data = await storeProcedure('AgregarEventoAgenda', {
        start: inicio,
        endDate: finCita,
        title: `Espacio disponible: ${moment(inicio).hour()}-${moment(finCita).hour()}`,
        IdDoctor: objeto.IdDoctor
      })
      inicio = finCita;
    }
    inicio = moment(inicio).hour( moment(data.FechaInicial).hour() );
    inicio = moment(inicio, "YYYY-MM-DD HH:mm").add(1, 'd').format("YYYY-MM-DD HH:mm");
  }
    
  return "data[0]";
}

const agregarEventoAgenda = async (objeto) => {
  const data = await storeProcedure('AgregarEventoAgenda', objeto)
    
  return data[0];
}

const actualizarEventoAgenda = async (id,objeto) => {

  const data = await storeProcedure('ActualizarEventoAgenda',{IdAgenda: id, IdDoctor : objeto })
    
  return data[0];
}

const insertarDetalleEvento = async (id,objeto) => {
  objeto.IdAgenda = id;
  delete objeto.IdDoctor;
  const data = await storeProcedure('InsertarDetalleEvento',objeto)

  let enviarACorreo = data[0].enviarACorreo;

  let enviarACelular = data[0].enviarACelular;

  delete data[0].enviarACorreo, data[0].enviarACelular;

  const correo = await enviarEmail(data[0],'agendacionCita',"Agendación de nueva cita",enviarACorreo);

  const wp = await enviarMensajeWP(data[0]);

  const sms = await enviarMensajeSMS(data[0])
  
  return data[0];
}


const configurarDiasLaborales = async (dias) => {

  const diasBD = await storeProcedure('ObtenerDiasLaborales' , { IdDoctor: dias[0].IdDoctor});

  console.log(diasBD.length)

  let data;

  if(diasBD.length !== 0) {
    data = await Promise.all(dias.map(async d => {
      let dia = await storeProcedure('ActualizarConfiguracionDias', d).catch(err => console.log(err))
    })).catch(err => {throw new Error(err)});
  } else {
    data = await Promise.all(dias.map(async d => {
      let dia = await storeProcedure('ConfigurarDias', d).catch(err => console.log(err))
    }
  )).catch(err => {throw new Error(err)});
  }

  return data[0];
} 

const cancelarCitaAgenda = async (id) => {
  const data = await storeProcedure('CancelarCita', {IdAgenda: id});

  return data[0];
}

module.exports = {
    obtenerEventosAgenda,
    agregarEventoAgenda,
    actualizarEventoAgenda,
    llenarDatosAgenda,
    insertarDetalleEvento,
    obtenerEventosAgendados,
    configurarDiasLaborales,
    obtenerDetalleEventosAgenda,
    cancelarCitaAgenda
}