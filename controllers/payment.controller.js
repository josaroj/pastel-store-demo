
var orderModel = require('../models/order.model.js');
var cartModel = require('../models/cart.model.js');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.insertPaymentBy = async function insertPaymentBy(data) {
    if (
        data.token
        && data.user_code
        && data.carts
        && data.PUBLIC_KEY
        && data.SECRET_KEY
        && data.API_VERSION
    ) {

        var omise = require('omise')({
            'secretKey': data.SECRET_KEY,
            'omiseVersion': data.API_VERSION
        });

        let token = data.token;
        let amount_total = data.amount_total;

        let max_code_result = await orderModel.getOrderMaxCode();
 

        let resp = await omise.charges.create({
            'description': 'Charge for order ID: ' + max_code_result[0].max_code,
            'amount': amount_total * 100,
            'currency': 'thb',
            'capture': true,
            'card': token
        });

        console.log("resp : ", resp); 

        if (resp.paid) {
            //Success
            data.order_code = max_code_result[0].max_code;
            data.order_status = 'SUCCESS_PAYMENT';
            data.token_payment = resp.id;

            order_result = await orderModel.insertOrder(data);


            if (order_result == true) {
                for (i = 0; i < data.carts.length; i++) {
                    cart = [];
                    cart.order_code = max_code_result[0].max_code;
                    cart.user_code = data.carts[i].user_code;
                    cart.product_code = data.carts[i].product_code;
                    await cartModel.updateCartOrder(cart);
                }
            }

            return true;
        } else {
            //Handle failure
            console.log(val.failure_code);
            return false;
        }
    } else {
        return false;
    }
}



module.exports = Task;