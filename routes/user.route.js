var userController = require('../controllers/user.controller');

module.exports = function (app) {


    //############################## Admin Route #####################################


    app.post('/user/login/', async function (req, res) {
        const result = await userController.getUserLoginBy(req.body)
        res.send(result)
    })
}