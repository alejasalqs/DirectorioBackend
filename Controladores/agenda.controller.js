var db = require('../Data/database');

const obtenerEventosAgenda = async (id) => {
    let data = await db.sequelize
    .query('EXEC dbo.ObtenerEventosAgenda @IdDoctor = :id', {
      replacements: { id: id },
    })
    .catch( err => { throw err})
    
    return data[0];
}

const agregarEventoAgenda = async (objeto) => {
    let data = await db.sequelize
    .query(
      'EXEC dbo.AgregarEventoAgenda @IdDoctor = :id, @Evento = :evento, @FechaInicio = :fechaInicio, @FechaFinal = :fechaFinal, @Color = :color, @EsTodoElDia = :esTodoElDia',
      {
        replacements: {
          id: objeto.id,
          evento: objeto.evento,
          fechaInicio: objeto.fechaInicio,
          fechaFinal: objeto.fechaFinal,
          color: objeto.color,
          esTodoElDia: objeto.esTodoElDia,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const actualizarEventoAgenda = async (id, objeto) => {
  let data = await db.sequelize
  .query(
    'EXEC dbo.ActualizarEventoAgenda  @Evento = :evento, @FechaInicio = :fechaInicio, @FechaFinal = :fechaFinal, @Color = :color, @EsTodoElDia = :esTodoElDia, @IdDoctor = :id, @IdAgenda = :idagenda',
    {
      replacements: {
        id: id,
        idagenda: objeto.idagenda,
        evento: objeto.evento || null,
        fechaInicio: objeto.fechaInicio || null,
        fechaFinal: objeto.fechaFinal || null,
        color: body.objeto || null,
        esTodoElDia: objeto.esTodoElDia || null,
      },
    }
  )
  .catch( err => { throw err})
    
   return data[0];
}

module.exports = {
    obtenerEventosAgenda,
    agregarEventoAgenda,
    actualizarEventoAgenda
}