
  /**
   * Recibe un objeto, si en el objeto hay un campo fecha se revisa el formato de la fecha y se le asigna una con el formato especificado.
   * 
   * @param {Object} obj (Obligatorio) Objeto que se quiere convertir.
   */
const darFormatoFechaDDMMYYYY = async (obj) => {
    try {
        for(var key of Object.keys(obj)){
            if(key.toLowerCase().includes('fecha')){
                obj[key] = new Date(obj[key]).toLocaleString();
            }
        }  
        return obj;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    darFormatoFechaDDMMYYYY
}