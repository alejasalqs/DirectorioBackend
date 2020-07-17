const db = require('../Data/database');

const crearRedSocial = async (objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.CrearNuevaRedSocial @Descripcion = :descripcion, @Url = :url, @IdDoctor = :doctorid',
      {
        replacements: {
          descripcion: objeto.descripcion,
          url: objeto.url,
          doctorid: objeto.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const actualizarRedSocial = async (params, objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.ActualizarRedesSociales  @IdRedesSociales = :redsocialid, @IdDoctor = :doctorid, @Descripcion = :descripcion, @Url = :url',
      {
        replacements: {
          descripcion: objeto.descripcion || null,
          url: objeto.url || null,
          redsocialid: params.redsocialid,
          doctorid: params.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const eliminarRedSocial = async (params) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.EliminarRedSocial  @IdRedesSociales = :redsocialid, @IdDoctor = :doctorid',
      {
        replacements: {
          redsocialid: params.redsocialid,
          doctorid: params.doctorid,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

module.exports = {
    crearRedSocial,
    actualizarRedSocial,
    eliminarRedSocial
}