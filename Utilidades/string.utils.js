/**
   * Convierte valores de cadena de texto a un objeto tipo JSON.
   * 
   * @param {Object} obj (Obligatorio) Objeto que se quiere convertir.
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

module.exports = {
    parseStringToJson,
    reemplazarStringStoreProcedure
}