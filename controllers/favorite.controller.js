var favoriteModel = require('../models/favorite.model.js');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getFavoriteBy = async function getFavoriteBy(data) {
    var _data = []
    if (data.product_code) {
        _data = await favoriteModel.getUserCodeByProductCode(data);
    } else if (data.user_code) {
        _data = await favoriteModel.getProductByUserCode(data);
    }

    return _data;
}

Task.insertFavoriteBy = async function insertFavoriteBy(data) {
    var _data = await favoriteModel.insertFavoriteBy(data);
    return _data;
}


Task.deleteFavoriteBy = async function deleteFavoriteBy(data) {
    var _data = await favoriteModel.deleteFavoriteBy(data);
    return _data;
}



module.exports = Task;