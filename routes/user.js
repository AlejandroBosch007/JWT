const midd = require('../middlewares/user')
const userService = require('../services/user')

module.exports = (app) => {
    app.post('/login', async (req, res) => {
        let user = req.body
        try {
            let result = await userService.userValidate(user)
            if (result) {
                let token = await userService.tokenGeneration(user.user)
                res.json(token)
            }
        } catch (err) {
            res.status(400).send('Unregistered user')
        }
    })

    app.get('/users', midd.userValidation, async (req, res) => {
        try {
            let result = await userService.userList()
            res.json(result)
        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })

    app.post('/newuser', async (req, res) => {
        try {
            let user = req.body
            let result = await userService.userCreator(user)
            res.json(result)

        } catch (err) {
            res.status(400).send('An unexpected error occurred')
        }
    })
}