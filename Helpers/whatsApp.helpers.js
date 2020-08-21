const { twilio } = require('../Data/config')
const wpTwilio = require('twilio')(twilio.accountSid, twilio.authToken);

const enviarMensajeWP = async (datos) => {
    wpTwilio.messages.create({
     //from: '+12016853652',
     from: 'whatsapp:+14155238886',  
     body: `La siguiente persona a agendado una cita en su consultorio:
     Nombre: ${datos.NombreCompleto}
     Cedula: ${datos.cedula}
     Correo: ${datos.correo}
     Celular: ${datos.celular}
     Fecha inicio: ${datos.Inicio}
     Fecha Fin: ${datos.Final}
     Motivo: ${datos.MotivoCita}`,
     to: 'whatsapp:+50684469756'
   })
  .then(message => console.log(message))
  .catch(err => console.log(err));
}

const enviarMensajeSMS = async (datos) => {
  wpTwilio.messages.create({
    from: '+14155238886',
   body: `La siguiente persona a agendado una cita en su consultorio:
   Nombre: ${datos.NombreCompleto}
   Cedula: ${datos.cedula}
   Correo: ${datos.correo}
   Celular: ${datos.celular}
   Fecha inicio: ${datos.Inicio}
   Fecha Fin: ${datos.Final}
   Motivo: ${datos.MotivoCita}`,
   to: '+50684469756'
 })
.then(message => console.log(message))
.catch(err => console.log(err));
}
module.exports = {
    enviarMensajeWP,
    enviarMensajeSMS
}