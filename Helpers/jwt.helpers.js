const jwt = require('jsonwebtoken');
const { SEED } = require('../Data/config')

const generarJWT = async(id) => {
    return new Promise((resolve, reject) => {
        //payload
        const paylod = {
            id
        };

        jwt.sign(paylod,SEED,{
            expiresIn: '24h'
        }, (err,token) => {
            if(err){
                console.log(err)
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}