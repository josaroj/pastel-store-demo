var paymentController = require('../controllers/payment.controller');

module.exports = function (app) {


    //############################## Admin Route #####################################


    app.post('/payment/', async function (req, res) {
        const result = await paymentController.insertPaymentBy(req.body)
        res.send(result)
    })
}