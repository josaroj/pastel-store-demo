var orderController = require('../controllers/order.controller');

module.exports = function (app) {


    //############################## Admin Route #####################################


    app.post('/order/', async function (req, res) {
        const result = await orderController.getOrderBy(req.body)
        res.send(result)
    })

    app.post('/order/insert/', async function (req, res) {
        const result = await orderController.insertOrderBy(req.body)
        res.send(result)
    })

    app.post('/order/update/', async function (req, res) {
        const result = await orderController.updateOrderBy(req.body)
        res.send(result)
    })

    app.post('/order/delete/', async function (req, res) {
        const result = await orderController.deleteOrderBy(req.body)
        res.send(result)
    })


}