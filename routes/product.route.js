var productController = require('../controllers/product.controller');

module.exports = function (app) {


    //############################## Admin Route #####################################


    app.post('/product/',async function (req, res) {
        const result = await productController.getProductBy(req.body)
        res.send(result)
    })
}