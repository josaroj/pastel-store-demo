var productModel = require('../models/product.model.js');
var productSize = require('../models/product-size.model');
var productColor = require('../models/product-color.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getProductBy = async function getProductBy(data) {
    var _data = await productModel.getProductBy(data);
    for (i = 0; i < _data.length; i++) {

        _data[i].sizes = [];
        product_sizes = await productSize.getProductSizeBy(_data[i]);
        for (j = 0; j < product_sizes.length; j++) {
            _data[i].sizes[j] = product_sizes[j].product_size;
        }

        _data[i].colors = [];
        product_colors = await productColor.getProductColorBy(_data[i]);
        for (j = 0; j < product_colors.length; j++) {
            _data[i].colors[j] = product_colors[j].product_color;
        }

        _data[i].favorite = _data[i].favorite == '1' ? true : false;
    } 
    return _data;
}



module.exports = Task;