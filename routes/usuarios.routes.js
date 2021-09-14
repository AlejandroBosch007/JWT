const midd = require('../middlewares/midd.usuario')
const usuariosService = require('../services/usuarios.services')
const cors = require('cors')

//Exporto los modulos
module.exports = (app)=> {

    app.get('/login', cors(midd.corsOption), async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await usuariosService.chequearUsrValido(usuario)
            if (resultado) {
                let validacion = await usuariosService.generaToken(usuario)
                res.json(validacion)
            }
        }catch (err){
            console.log(err)
            res.status(400).send('Usuario no registrado')
        }
    })

    app.get('/usuarios', midd.usuarioValido, async (req,res)=>{
        try {
            let resultado = await usuariosService.listaUsuarios()
            console.log(resultado)
            res.json(resultado)
        }catch (err){
            console.log(err)
            res.status(400).send('Ocurrio un error inesperado')
        }
    })

    app.post('/nuevousuario', async (req,res)=>{
        try{

            let resultado = usuariosService.crearUsuarios(usuario)
            res.json(resultado)

        }catch(err){
            console.log(err)
            res.status(400).send('Ocurrio un error inesperado')  
        }
    })
}