const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { readHTMLFile, descomponerDatosEmail } = require('../Utilidades/file.utils');
const { correo } = require('../Data/config');


const crearMetodoDeTransporte = async () => {
    return nodemailer.createTransport({
        maxConnections: 3,
        pool: true,
        host: "smtp.live.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: correo.USER,
            pass: correo.PASS
        }
    });
}

const enviarEmail = async (datos, plantilla, asunto, para) => {
    return new Promise( async (resolve, reject) => {
        // Definimos el transporter
        const transporter = await crearMetodoDeTransporte();

        const html = await readHTMLFile(`../Templates/${plantilla}.template.html`).catch(err => console.log(err));
    
        const template = handlebars.compile(html);
    
        const replacements = await descomponerDatosEmail(datos)
    
        const htmlToSend = template(replacements);
        // Definimos el email
        const mailOptions = {
            from: '"Argus Salud" <alejandrosalgueroq@hotmail.com>',
            to: para,
            subject: asunto,
            html : htmlToSend
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error){
                reject(error);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
}


const enviarEmailCambioContrasena = async (datos, plantilla) => {
    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: correo.USER,
            pass: correo.PASS
        }
    });

   const html = await readHTMLFile('../Templates/cambioContrasena.template.html').catch(err => console.log(err));

   const template = handlebars.compile(html);

   const replacements = {
        nuevaContrasena: datos.nuevaContrasena
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
    enviarEmail,
    enviarEmailCambioContrasena
}