var favoriteController = require('../controllers/favorite.controller');

module.exports = function (app) {


    //############################## Admin Route #####################################


    app.post('/favorite/', async function (req, res) {
        const result = await favoriteController.getFavoriteBy(req.body)
        res.send(result)
    })

    app.post('/favorite/insert/', async function (req, res) {
        const result = await favoriteController.insertFavoriteBy(req.body)
        res.send(result)
    })

    app.post('/favorite/delete/', async function (req, res) {
        const result = await favoriteController.deleteFavoriteBy(req.body)
        res.send(result)
    })


}