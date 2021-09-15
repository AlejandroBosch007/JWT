const sequelize = require('./conexion')

module.exports.newUser = async (usr) => {
    try {
        let result = await sequelize.query(`SELECT * FROM users WHERE lastname = '${usr.lastname}'`);
        if (result.lenght > 0) {
            return false
        } else {
            await sequelize.query(`INSERT INTO users ([name],lastname,email,[user],[password]) VALUES ('${usr.name}','${usr.lastname}','${usr.email}','${usr.user}','${usr.password}')`);
            return true
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.userExist = async (usr) => {
    let user = [usr.user, usr.password]
    try {
        let result = await sequelize.query(`SELECT * FROM users WHERE [user] = '${user[0]}'`);
        if (result) {
            let verify = await sequelize.query(`SELECT * FROM users WHERE [password] = '${user[1]}'`);
            if (verify) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.users = async () => {
    try {
        let result = await sequelize.query('SELECT * FROM users')
        return result
    } catch (err) {
        throw new Error(err)
    }
}