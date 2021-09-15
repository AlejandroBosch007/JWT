const userDB = require('../db/user')
const jwt = require('jsonwebtoken')

module.exports.tokenGeneration = async (data) => {
    const result = jwt.sign({ data }, process.env.SECRET_KEY);
    return result
}

module.exports.userVerify = async (token) => {
    const result = jwt.verify(token, process.env.SECRET_KEY)
    if (result) {
        return result
    } else {
        throw new Error('Invalid Token')
    }
}

module.exports.userList = async () => {
    try {
        let result = await userDB.users()
        return result
    } catch (err) {
        throw new Error('DB Error')
    }
}

module.exports.userCreator = async (user) => {
    let newUser = {
        name: user.name,
        user: user.user,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
    }
    try {
        console.log(newUser)
        let result = await userDB.newUser(newUser)

        if (result) {
            return 'User creation successfully'
        } else {

            throw new Error('User already exists')
        }

    } catch (err) {
        throw new Error('User creation error')
    }
}

module.exports.userValidate = async (usr) => {
    try {
        let result = await userDB.userExist(usr)
        if (result) {
            return result
        } else {
            throw new Error('User does not exist')
        }
    } catch (err) {
        throw new Error(err)
    }
}