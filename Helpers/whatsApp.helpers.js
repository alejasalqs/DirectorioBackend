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
    from: '+1 760 530 4764',
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

const enviarRecordatorioWP = async (doctor,inicio, enviarA) => {
  wpTwilio.messages.create({
   from: 'whatsapp:+14155238886',  
   body: `Se le recuerda su cita con el Doctor(a) ${doctor}.
   En la fecha: ${inicio}.
   Si por algún motivo no puede presentarse por favor comunicarse al número: 88888`,
   to: `whatsapp:+50670162500`
 })
.then(message => console.log(message))
.catch(err => console.log(err));
}


const enviarRecordatorioSMS = async (doctor,inicio, enviarA) => {
  wpTwilio.messages.create({
    from: '+1 760 530 4764',  
   body: `Se le recuerda su cita con el Doctor(a) ${doctor}.
   En la fecha: ${inicio}.
   Si por algún motivo no puede presentarse por favor comunicarse al número: 88888`,
   to: `whatsapp:+506${enviarA}`
 })
.then(message => console.log(message))
.catch(err => console.log(err));
}

module.exports = { 
    enviarMensajeWP,
    enviarMensajeSMS,
    enviarRecordatorioWP,
    enviarRecordatorioSMS 
}