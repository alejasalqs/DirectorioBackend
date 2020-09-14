const { enviarRecordatorioWP } = require('../Helpers/whatsApp.helpers');
const { enviarEmail } = require('../Helpers/email.helpers');
const { correo } = require('../Data/config');

const enviarRecordatorio = async (cita) => {
    
    const mail = await enviarEmail({
        Doctor: cita.Doctor,
        Inicio: cita.start,
        Fin: cita.endDate,
        MotivoCita: cita.motivocita,
        telefono: "",
        correo: ""
    },"recordatorioCita","Recordatorio de cita",cita.correo)
    
    const wp = await enviarRecordatorioWP(cita.Doctor,cita.start,"");

    return {
        ok: true,
        mensaje: "Se ha mandado un recordatorio correctamente "
    };
}

module.exports = {
    enviarRecordatorio
}