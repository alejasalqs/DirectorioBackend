const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { readHTMLFile } = require('../Utilidades/file.utils');
const { correo } = require('../Data/config');

const enviarEmail = async (datos, plantilla) => {
    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'alejandrosalgueroq@hotmail.com',
            pass: 'pokemon987654321'
        }
    });

   const html = await readHTMLFile('../Templates/agendacionCita.template.html').catch(err => console.log(err));

   const template = handlebars.compile(html);

   const replacements = {
        Nombre: datos.NombreCompleto,
        Cedula: datos.cedula,
        Correo: datos.correo,
        Correo: datos.celular,
        Inicio:datos.Inicio,
        Fin:datos.Final,
        MotivoCita:datos.MotivoCita
    };
    const htmlToSend = template(replacements);
    // Definimos el email
    const mailOptions = {
        from: '"Alejandro Salguero 👻" <alejandrosalgueroq@hotmail.com>',
        to: 'alesalgueroq1223@gmail.com',
        subject: 'Agendación cita médica',
        html : htmlToSend
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            return new Error(error.message);
        } else {
            console.log("Email sent");
            return req.body;
        }
    });
}

module.exports = {
    enviarEmail
}