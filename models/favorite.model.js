var connection = require('./base.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.getProductByUserCode = function getProductByUserCode(data) {

    return new Promise(function (resolve) {
        var str_sql = ` SELECT tb_product.* 
    FROM tb_favorite 
    LEFT JOIN tb_product ON tb_favorite.product_code = tb_product.product_code
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

Task.getUserCodeByProductCode = function getUserCodeByProductCode(data) {

    return new Promise(function (resolve) {
        var str_sql = ` SELECT user_code 
    FROM tb_favorite  
    WHERE product_code = ${connection.escape(data.product_code)}
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

Task.insertFavoriteBy = function insertFavoriteBy(data) {

    return new Promise(function (resolve) {
        var str_sql = ` INSERT INTO tb_favorite ( 
                    user_code,
                    product_code 
                ) VALUES ( 
                    ${connection.escape(data.user_code)},
                    ${connection.escape(data.product_code)} 
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

Task.deleteFavoriteBy = function deleteFavoriteBy(data) {

    return new Promise(function (resolve) {
        var str_sql = ` DELETE FROM tb_favorite  
                WHERE user_code = ${connection.escape(data.user_code)} 
                AND product_code = ${connection.escape(data.product_code)} ; 
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