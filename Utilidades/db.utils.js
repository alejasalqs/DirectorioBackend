const { reemplazarStringStoreProcedure } = require('./string.utils')
const db = require('../Data/database');

/**
   * Ejecuta un Store Procedure de la Base de datos.
   * 
   * @param {Object} nombre (Obligatorio) Nombre del Store Procedure.
   * @param {Object} parametros (Opcional) Parametros del Store Procedure.
   */
const storeProcedure = async (nombre, parametros) => {
      let opts = {
        raw: false
      }

      if (parametros) {
          opts.replacements = parametros
      }
  
      let data = await db.sequelize.query(`EXEC dbo.${nombre} ${reemplazarStringStoreProcedure(parametros)}`, opts).catch(err => {
          console.error(err); 
          throw err 
      })
  
      return data[0];
  }

module.exports = {
    storeProcedure
}