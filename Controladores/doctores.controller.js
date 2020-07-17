const db = require('../Data/database');
const { parseStringToJson } = require('../Utilidades/string.utils')
var bcrypt = require('bcryptjs');

const obtenerDoctores = async (objeto) => {
    
    let data = await db.sequelize.query('EXEC dbo.ObtenerDoctores @Termino = :termino, @Genero = :genero, @Locacion = :locacion',
      {
        replacements: {
          termino: objeto.termino || null,
          genero: objeto.genero || null,
          locacion: objeto.locacion || null,
        },
      }
    )
    .catch( err => { throw err})
    
    data = await parseStringToJson(data[0]);
      
    return data;
}

const obtenerDoctorPorID = async (id) => {
    let data = await db.sequelize.query('EXEC dbo.ObtenerDoctorID @IdDoctor = :id', {
      replacements: { id: id },
    })
    .catch( err => { throw err})
    
    data = await parseStringToJson(data[0]);
      
    return data;
}

const crearDoctor = async (objeto) => {
    let data = await db.sequelize.query(
      'EXEC dbo.CrearNuevoDoctor @Nombre = :nombre, @PrimerApellido = :primerApellido, @SegundoApellido = :segundoApellido, @Correo = :correo, @Contrasena = :contrasena,  @Celular = :celular, @Genero = :genero ,@Locacion = :locacion,@FechaNacimiento = :fechaNacimiento',
      {
        replacements: {
          nombre: objeto.nombre,
          primerApellido: objeto.primerApellido,
          segundoApellido: objeto.segundoApellido || '',
          correo: objeto.correo,
          contrasena: bcrypt.hashSync(objeto.contrasena, 10),
          celular: objeto.celular,
          genero: objeto.genero || true,
          fechaNacimiento: objeto.fechaNacimiento,
          locacion: objeto.locacion,
        },
      }
    )
    .catch( err => { throw err})
    
    return data[0];
}

const actualizarDoctor = async (id,objeto) => {
    
  let data = db.sequelize.query(
    'EXEC dbo.ActualizarDoctorExistente @Nombre = :nombre, @PrimerApellido = :primerApellido, @SegundoApellido = :segundoApellido, @Correo = :correo, @Contrasena = :contrasena, @WebURL = :paginaWeb, @Celular = :celular, @TelefonoOficina = :telefonoOficiona ,@Genero = :genero ,@Locacion = :locacion,	@SobreMi = :sobreMi,@Foto = :foto,@FechaNacimiento = :fechaNacimiento, @DoctorID  = :id ',
    {
      replacements: {
        nombre: objeto.nombre || null,
        primerApellido: objeto.primerApellido || null,
        segundoApellido: objeto.segundoApellido || null,
        correo: objeto.correo || null,
        contrasena: objeto.contrasena || null,
        paginaWeb: objeto.paginaWeb || null,
        celular: objeto.celular || null,
        telefonoOficiona: objeto.telefonoOficiona || null,
        genero: objeto.genero || null,
        sobreMi: objeto.sobreMi || null,
        foto: objeto.foto || null,
        fechaNacimiento: objeto.fechaNacimiento || null,
        locacion: objeto.locacion || null,
        id: id,
      },
    }
  )
  .catch( err => { throw err})
    
  return data[0];
}

const eliminarDoctor = async(id) => {
    let data = await db.sequelize.query('EXEC dbo.EliminarDoctor @IdDoctor = :id', {
        replacements: { id: id },
    })
    .catch( err => { throw err})
        
    return data[0];
}

module.exports = {
    obtenerDoctores,
    obtenerDoctorPorID,
    crearDoctor,
    actualizarDoctor,
    eliminarDoctor
}