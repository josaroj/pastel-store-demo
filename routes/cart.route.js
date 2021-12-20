var cartController = require('../controllers/cart.controller');

module.exports = function (app) {


    //############################## Admin Route #####################################


    app.post('/cart/', async function (req, res) {
        const result = await cartController.getCartBy(req.body)
        res.send(result)
    })

    app.post('/cart/insert/', async function (req, res) {

        const result = await cartController.insertCartBy(req.body)
        res.send(result)
    })

    app.post('/cart/update/', async function (req, res) {
        const result = await cartController.updateCartBy(req.body)
        res.send(result)
    })

    app.post('/cart/delete/', async function (req, res) {
        const result = await cartController.deleteCartBy(req.body)
        res.send(result)
    })


}