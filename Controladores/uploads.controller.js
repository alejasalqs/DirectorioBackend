const { storeProcedure } = require("../Utilidades/db.utils")
const fs = require('fs')
const path = require('path');

const fileUpload = async (tipo,id,nombreArchivo) => {

    const data = await storeProcedure('ObtenerDoctorID',{IdDoctor: id})

    if(!data){
        return false;
    }

    const pathViejo = `./Uploads/${tipo}/${data[0].Foto}`;
    if( fs.existsSync(pathViejo)){
        fs.unlinkSync(pathViejo);
    }

    const result = await storeProcedure('ActualizarFotoPerfil',{Foto: nombreArchivo, IdDoctor: id});

    return true;
}

const retornaImg = async (tipo,foto) => {
    const pathImg = path.join(__dirname,`../Uploads/${tipo}/${foto}`);

    if(fs.existsSync(pathImg)){
        return pathImg;
    } else {
        const pathImg = path.join(__dirname,`../Uploads/no-img.png`);
        return pathImg;
    }
}

module.exports = {
    fileUpload,
    retornaImg
}