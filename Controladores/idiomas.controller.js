const db = require('../Data/database');

const crearIdioma = async (objeto) => {
    let data = await db.sequelize
      .query(
        'EXEC dbo.CrearNuevoIdioma @Descripcion = :descripcion, @IdDoctor = :doctorid',
        {
          replacements: {
            descripcion: objeto.descripcion,
            doctorid: objeto.doctorid,
          },
        }
      )
      .catch( err => { throw err})
    
    return data[0];
}

const actualizarIdioma = async (params, objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.ActualizarIdioma  @IdIdioma = :ididioma, @IdDoctor = :doctorid, @Descripcion = :descripcion',
      {
        replacements: {
          descripcion: objeto.descripcion,
          ididioma: params.ididioma,
          doctorid: params.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
} 

const eliminarIdioma = async (params) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.EliminarIdioma  @IdIdioma = :ididioma, @IdDoctor = :doctorid',
      {
        replacements: {
          ididioma: params.ididioma,
          doctorid: params.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
} 

module.exports = {
    crearIdioma,
    actualizarIdioma,
    eliminarIdioma
}