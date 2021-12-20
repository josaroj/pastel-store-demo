var connection = require('./base.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.getOrderByUserCode = function getOrderByUserCode(data) {
    return new Promise(function (resolve) {
        var str_sql = ` SELECT * 
                FROM tb_order  
                WHERE user_code = ${connection.escape(data.user_code)}  
            `;

        connection.query(str_sql, function (err, res) {

            if (err) {
                resolve([]);
            }
            else {
                resolve(res);
            }

        });
    });
};

Task.getOrderByOrderCode = function getOrderByOrderCode(data) {

    return new Promise(function (resolve) {
        var str_sql = ` SELECT * 
                FROM tb_order  
                WHERE order_code = ${connection.escape(data.order_code)}
            `;


        connection.query(str_sql, function (err, res) {

            if (err) {
                resolve([]);
            }
            else {
                resolve(res);
            }

        });
    });
};

Task.insertOrder = function insertOrder(data) {

    return new Promise(function (resolve) {
        var str_sql = ` INSERT INTO tb_order ( 
                    order_code,
                    order_date,
                    user_code, 
                    order_price, 
                    address, 
                    address_lat, 
                    address_lon, 
                    order_status ,
                    token_payment 
                ) VALUES ( 
                    ${connection.escape(data.order_code)},
                    ${connection.escape(data.order_date)},
                    ${connection.escape(data.user_code)},
                    ${connection.escape(data.order_price)},
                    ${connection.escape(data.address)},
                    ${connection.escape(data.address_lat)},
                    ${connection.escape(data.address_lon)},
                    ${connection.escape(data.order_status)},
                    ${connection.escape(data.token_payment)}
                ); 
    
    `;


        connection.query(str_sql, function (err, res) {

            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }

        });
    });
};

Task.updateOrderAddress = function updateOrderAddress(data) {

    return new Promise(function (resolve) {
        var str_sql = ` UPDATE tb_order SET 
                    address = ${connection.escape(data.$address)} 
                    address_lat = ${connection.escape(data.$address_lat)}, 
                    address_lon = ${connection.escape(data.address_lon)}
                WHERE order_code = ${connection.escape(data.order_code)} ; 
    `;


        connection.query(str_sql, function (err, res) {

            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }

        });
    });
};



Task.deleteOrder = function deleteOrder(data) {

    return new Promise(function (resolve) {
        var str_sql = ` DELETE FROM tb_order  
                WHERE order_code = ${connection.escape(data.order_code)} ; 
    `;


        connection.query(str_sql, function (err, res) {

            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }

        });
    });
};

Task.getOrderMaxCode = function getOrderMaxCode(data) {

    return new Promise(function (resolve) {
        var str_sql = ` SELECT  CONCAT('OD',LPAD(IFNULL(MAX(CAST(SUBSTRING(order_code,3 ,5)AS SIGNED)),0) + 1,5,0)) AS max_code
                FROM tb_order
    `;


        connection.query(str_sql, function (err, res) {

            if (err) {
                resolve([]);
            }
            else {
                resolve(res);
            }

        });
    });
};
module.exports = Task;