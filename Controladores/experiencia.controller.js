const db = require('../Data/database');


const crearExperiencia = async (objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.CrearNuevaExperiencia @Puesto = :puesto,@LugarTrabajo = :lugartrabajo,@FechaInicial = :fechainicial,@FechaFinal = :fechafinal,@Labores = :labores, @IdDoctor = :doctorid',
      {
        replacements: {
          puesto: objeto.puesto,
          lugartrabajo: objeto.lugartrabajo,
          fechainicial: objeto.fechainicial,
          fechafinal: objeto.fechafinal,
          labores: objeto.labores,
          doctorid: objeto.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const actualizarExperiencia = async (params, objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.ActualizarExperiencia @Puesto = :puesto, @LugarTrabajo = :lugartrabajo,@FechaInicial = :fechainicial,@FechaFinal = :fechafinal,@Labores = :labores, @IdDoctor = :doctorid, @IdExperiencia = :experienciasid',
      {
        replacements: {
          puesto: objeto.puesto || null,
          lugartrabajo: objeto.lugartrabajo || null,
          fechainicial: objeto.fechainicial || null,
          fechafinal: objeto.fechafinal || null,
          labores: objeto.labores || null,
          doctorid: params.doctorid,
          experienciasid: params.experienciasid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const eliminarExperiencia = async (params) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.EliminarExperiencia @IdDoctor = :doctorid, @IdExperiencia = :experienciasid',
      {
        replacements: {
          doctorid: params.doctorid,
          experienciasid: params.experienciasid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

module.exports = {
    crearExperiencia,
    actualizarExperiencia,
    eliminarExperiencia
}