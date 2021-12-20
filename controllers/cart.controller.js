var cartModel = require('../models/cart.model.js');
var productSizeModel = require('../models/product-size.model');
var productColorModel = require('../models/product-color.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getCartBy = async function getCartBy(data) {
    var _data = await cartModel.getProductByUserCode(data);
    for (let index = 0; index < _data.length; index++) {
        _data[index]['sizes'] = [];
        let product_sizes = await productSizeModel.getProductSizeBy(_data[index]['id']);
        for (j = 0; j < product_sizes.length; j++) {
            _data[index]['sizes'].push(product_sizes[j]['product_size']);
        }

        _data[index]['colors'] = [];
        let product_colors = await productColorModel.getProductColorBy(_data[index]['id']);
        for (j = 0; j < product_colors.length; j++) {
            _data[index]['colors'].push(product_colors[j]['product_color']);
        }

        _data[index]['favorite'] = _data[index]['favorite'] == '1' ? true : false;

    }
    return _data;
}

Task.insertCartBy = async function insertCartBy(data) {

    let product = await cartModel.getProductByCode(data); 
    let _data = false;
    if (product.length > 0) {
        data.order_qty = data.order_qty + product[0].order_qty;
        _data = await cartModel.updateCartQty(data);
    } else {
        _data = await cartModel.insertCartBy(data);
    }
    return _data;
}

Task.updateCartBy = async function updateCartBy(data) {
    var _data = await cartModel.updateCartQty(data);
    return _data;
}

Task.deleteCartBy = async function deleteCartBy(data) {
    var _data = await cartModel.deleteCartBy(data);
    return _data;
}



module.exports = Task;