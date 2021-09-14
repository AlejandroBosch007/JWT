//IMPORTO LOS MODULOS NECESARIOS
const usuariosService = require('../services/usuarios.services')
const cors = require('cors')
const rateLimit = require("express-rate-limit");

//EXPORTO MODULOS DE SERVICIO
module.exports.corsOption = {
    origin : function (origin, callback) {
        if (process.env.listaBlanca.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('No autorizado por Cors'))
        }

    }
}

module.exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'Usted exedió el limite de accesos a la API'
  });

module.exports.usuarioValido = async (req,res,next)=>{
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = await usuariosService.verificacionUsuario(token)
            req.params.usuario = verificado.data
            return next()
        }else{
            throw new Error ('Este es un sistema seguro y requiere autorización')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}