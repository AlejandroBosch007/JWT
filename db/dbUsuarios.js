//Importo los modulos necesarios
const sequelize = require('./conexion')

//Exporto los modulos

module.exports.nuevoUsuario = async (usr)=> {
    try {
        let resultado = await sequelize.query(`SELECT * FROM usuarios WHERE apellido = ${usr.apellidos}`);
        if (resultado.lenght >0){
            return false
        }else {
            await sequelize.query(`INSERT INTO usuarios ('nombres', 'apellidos', 'email', 'usuario','contrasena') VALUES (?,?,?,?)`, 
            {replacements: usr, type: sequelize.QueryTypes.SELECT})
            return true
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.existenciaDeUsuario = async (usr)=>{
    let usuario = [usr.usuario , usr.contrasena]
    try {
        let resultado = await sequelize.query(`SELECT * FROM dbo.usuarios WHERE usuarios.usuario = '${usuario[0]}'`);
        if (resultado) {
            let chequeado = await sequelize.query(`SELECT * FROM usuarios WHERE usuarios.contrasena = '${usuario[1]}'`);
            if (chequeado) {
                return true
            }else {
                return false
            }
        }else {
            return false
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.usuarios = async ()=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM usuarios')
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

