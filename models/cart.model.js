var connection = require('./base.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.getProductByCode = function getProductByCode(data) {
    return new Promise(function (resolve) {
        var str_sql = ` SELECT * 
    FROM tb_cart 
    LEFT JOIN tb_product ON tb_cart.product_code =tb_product.product_code
    WHERE order_code = 'CART' 
    AND user_code = ${connection.escape(data.user_code)}  
    AND tb_cart.product_code =  ${connection.escape(data.product_code)}  
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

Task.getProductByUserCode = function getProductByUserCode(data) {
    return new Promise(function (resolve) {
        var str_sql = ` SELECT tb_cart.* ,
                    tb_cart.product_code as \`id\`, 
                    product_name as \`name\`, 
                    product_description as \`description\` , 
                    product_img as \`img\`, 
                    product_rating as \`rating\` , 
                    product_percent as \`percent\`, 
                    product_price as \`price\`, 
                    product_old_price as \`old_price\`, 
                    IF(
                        (
                            SELECT IFNULL(count(*),0) 
                            FROM tb_favorite 
                            WHERE product_code = tb_product.product_code 
                            AND user_code = ${connection.escape(data.user_code)}
                        ) > 0
                    ,true
                    ,false
                    ) as \`favorite\`, 
                    '' as \`sizes\`, 
                    '' as \`colors\`, 
                    product_sale_out as \`sale_out\`, 
                    product_stock as \`stock\` 
                FROM tb_cart 
                LEFT JOIN tb_product ON tb_cart.product_code = tb_product.product_code
                WHERE order_code = 'CART' 
                AND user_code = ${connection.escape(data.user_code)} 
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

Task.getProductByOrderCode = function getProductByOrderCode(data) {
    return new Promise(function (resolve) {
        var str_sql = ` SELECT * 
                FROM tb_cart 
                LEFT JOIN tb_product ON tb_cart.product_code =tb_product.product_code
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

Task.insertCartBy = function insertCartBy(data) {
    return new Promise(function (resolve) {
        var str_sql = ` INSERT INTO tb_cart ( 
                    order_code,
                    user_code,
                    product_code, 
                    product_size, 
                    product_color, 
                    order_qty 
                ) VALUES ( 
                    'CART',
                    ${connection.escape(data.user_code)},
                    ${connection.escape(data.product_code)},
                    ${connection.escape(data.product_size)},
                    ${connection.escape(data.product_color)},
                    ${connection.escape(data.order_qty)}
                ); `;
 


        connection.query(str_sql, function (err, res) {
            console.log(err);
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }

        });
    });
};

Task.updateCartQty = function updateCartQty(data) {
    return new Promise(function (resolve) {
        var str_sql = ` UPDATE tb_cart SET 
                    order_qty = ${connection.escape(data.order_qty)} 
                WHERE order_code = 'CART'
                    AND user_code = ${connection.escape(data.user_code)} 
                    AND product_code = ${connection.escape(data.product_code)} 
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

Task.updateCartOrder = function updateCartOrder(data) {
    return new Promise(function (resolve) {
        var str_sql = ` UPDATE tb_cart SET 
                    order_code = ${connection.escape(data.order_code)} 
                WHERE order_code = 'CART' 
                    AND user_code = ${connection.escape(data.user_code)} 
                    AND product_code = ${connection.escape(data.product_code)} 
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


Task.deleteCartByOrderCode = function deleteCartByOrderCode(data) {
    return new Promise(function (resolve) {
        var str_sql = ` DELETE FROM tb_cart  
    WHERE order_code = ${connection.escape(data.order_code)} 
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

Task.deleteCartBy = function deleteCartBy(data) {
    return new Promise(function (resolve) {
        var str_sql = ` DELETE FROM tb_cart  
    WHERE user_code = ${connection.escape(data.user_code)}
    AND product_code = ${connection.escape(data.product_code)}
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

module.exports = Task;