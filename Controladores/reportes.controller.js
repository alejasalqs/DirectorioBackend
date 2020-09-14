const { storeProcedure } = require("../Utilidades/db.utils")

const reportesIniciales = async(id) => {
    const data = await storeProcedure('ReportesIniciales', { IdDoctor: id })

    return data;
}


const topDoctores = async() => {
    const data = await storeProcedure('ObtenerTopDoctores')

    return data;
}

module.exports = {
    reportesIniciales,
    topDoctores
}