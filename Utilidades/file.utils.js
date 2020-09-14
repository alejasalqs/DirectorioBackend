var fs = require('fs');
const pathR = require('path');

const readHTMLFile = async (path) => {
    return new Promise((resolve, reject) => {
        pathTemplate = pathR.join(__dirname,path);
        fs.readFile(pathTemplate, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                reject(err);
            }
            else {
                resolve(html);
            }
        });
    })
};

const descomponerDatosEmail = async (datos) => {
    let obj = {};
    console.log(datos)
    for(let key of Object.keys(datos)) {
       obj[key] = datos[key];
    }

    return obj;
}

module.exports = {
    readHTMLFile,
    descomponerDatosEmail
}