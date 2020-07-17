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

module.exports = {
    parseStringToJson,
}