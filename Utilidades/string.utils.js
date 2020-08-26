/**
   * Recibe un objeto con los parámetros de un SP.
   * 
   * @param {Object} obj (Opcional) Parametros.
   */
const parseStringToJson = async (obj) => {
    for(var key of Object.keys(obj)){
        if (typeof obj[key] === 'object') {
            parseStringToJson(obj[key]);
        }

        try {
            obj[key] = JSON.parse(obj[key]);
        } catch(error) {
            obj[key] = obj[key];
        }
    }    
    return obj;
}

/**
   * Convierte valores de cadena de texto a un objeto tipo JSON.
   * 
   * @param {Object} obj (Obligatorio) Objeto que se quiere convertir.
   */
 const reemplazarStringStoreProcedure = (objeto) => {
    let str = ''
    let first = true
    for (let property in objeto) {
        if (objeto.hasOwnProperty(property)) {
            if(first) {
                str += `@${property} = :${property}`
                first = false
            }
            else 
                str += `, @${property} = :${property}`
        }         
    }
    return str
}


const generarStringRandom = async (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = {
    parseStringToJson,
    reemplazarStringStoreProcedure,
    generarStringRandom
}