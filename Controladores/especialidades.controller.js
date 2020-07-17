const db = require('../Data/database');

const crearEspecialidad = async (objecto) => {
    let data = await db.sequelize.query(
      'EXEC dbo.CrearNuevaEspecialidad @Descripcion = :descripcion, @IdDoctor = :doctorid',
      {
        replacements: {
          descripcion: objecto.descripcion,
          doctorid: objecto.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const actualizarEspecialidad = async (params,objeto) => {
    let data = await db.sequelize.query(
      'EXEC dbo.ActualizarEspecialidades  @IdEspecialiad = :idespecialidad, @IdDoctor = :doctorid, @Descripcion = :descripcion',
      {
        replacements: {
          descripcion: objeto.descripcion,
          idespecialidad: params.idespecialidad,
          doctorid: params.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
} 

const eliminarEspecialidad = async (params) => {
    let data = await db.sequelize.query(
      'EXEC dbo.EliminarEspecialidad  @IdEspecialidad = :idespecialidad, @IdDoctor = :doctorid',
      {
        replacements: {
          idespecialidad: params.idespecialidad,
          doctorid: params.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    console.log(data);
    return data[0];
} 

module.exports = {
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
}