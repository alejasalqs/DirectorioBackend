const cron = require('node-cron');
const { enviarEmail } = require('../Helpers/email.helpers');
const { storeProcedure } = require('../Utilidades/db.utils');
const { enviarRecordatorioWP, enviarRecordatorioSMS } = require('./whatsApp.helpers');


const enviarRecordatorioCita = async () => {
    
    cron.schedule("46 12 * * *", async () => {
        const data = await storeProcedure('NotificarEventos')

        setTimeout(async () => {
            for(let info of data) {
                    let enviarA = info.enviarA;
                    delete info.enviarA;
                    let email = await enviarEmail(info, "recordatorioCita", 'Recordatorio de cita', enviarA).catch(err => console.log(err));
                    //let wp = enviarRecordatorioWP(info.Doctor, info.Inicio, "");
                    //let sms = enviarRecordatorioSMS(info.Doctor, info.Inicio, "84469756")
            }
        }, 10000)
    });
}

module.exports = {
    enviarRecordatorioCita
}