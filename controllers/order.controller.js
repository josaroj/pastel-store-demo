var orderModel = require('../models/order.model.js');
var cartModel = require('../models/cart.model.js');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getOrderBy = async function getOrderBy(data) {
    var _data = [];
    if (data.user_code) {
        _data = await orderModel.getOrderByUserCode(data);
    } else if (data.order_code) {
        _data = await orderModel.getOrderByOrderCode(data);
        if (_data.length > 0) {
            _data = _data[0]
        }
        _data.order_list = await cartModel.getProductByOrderCode(data);
        console.log(_data);
    }
    return _data;
}

Task.insertOrderBy = async function insertOrderBy(data) {
    var _data = await orderModel.insertOrderBy(data);
    return _data;
}

Task.updateOrderBy = async function updateOrderBy(data) {
    var _data = await orderModel.updateOrderBy(data);
    return _data;
}

Task.deleteOrderBy = async function deleteOrderBy(data) {
    let _data_order = await orderModel.deleteOrder(data);
    let _data_cart = await cartModel.deleteCartByOrderCode(data);
    return _data_order && _data_cart;
}



module.exports = Task;