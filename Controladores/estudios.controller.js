const db = require('../Data/database');

const crearEstudio = async(objeto) => {
 let data = await db.sequelize
 .query(
   'EXEC dbo.CrearNuevoEstudio @Grado = :grado,@CentroEstudios = :centroestudios,@FechaInicial = :fechainicial,@FechaFinal = :fechafinal,@Descripcion = :descripcion, @IdDoctor = :doctorid',
   {
     replacements: {
       grado: objeto.grado,
       centroestudios: objeto.centroestudios,
       fechainicial: objeto.fechainicial,
       fechafinal: objeto.fechafinal,
       descripcion: objeto.descripcion,
       doctorid: objeto.doctorid,
     },
   }
 )
 .catch( err => { throw err})
    
 return data[0];
}

const actualizarEstudio = async(params,objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.ActualizarEstudios @Grado = :grado,@CentroEstudios = :centroestudios,@FechaInicial = :fechainicial,@FechaFinal = :fechafinal,@Descripcion = :descripcion, @IdDoctor = :doctorid, @IdEstudio = :estudioid',
      {
        replacements: {
          grado: objeto.grado || null,
          centroestudios: objeto.centroestudios || null,
          fechainicial: objeto.fechainicial || null,
          fechafinal: objeto.fechafinal || null,
          descripcion: objeto.descripcion || null,
          doctorid: params.doctorid,
          estudioid: params.estudioid
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const eliminarEstudio = async(params) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.EliminarEstudio @IdDoctor = :doctorid, @IdEstudio = :estudioid',
      {
        replacements: {
          doctorid: params.doctorid,
          estudioid: params.estudioid
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

module.exports = {
    crearEstudio,
    actualizarEstudio,
    eliminarEstudio
}