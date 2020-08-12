const nodemailer = require('nodemailer');

const enviarEmail = async (datos) => {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'alejandrosalgueroq@hotmail.com',
            pass: 'pokemon987654321'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: '"Alejandro Salguero 👻" <alejandrosalgueroq@hotmail.com>',
        to: datos.Destinatario,
        subject: datos.Asunto,
        text: datos.Informacion
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