var connection = require('./base.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.getProductBy = function getProductBy(data) {

    return new Promise(function (resolve) {
        var str_sql = ` SELECT 
        product_code as id, 
        product_name as name, 
        product_description as description , 
        product_img as img, 
        product_rating as rating , 
        product_percent as percent, 
        product_price as price, 
        product_old_price as old_price, 
        IF(
            (
                SELECT IFNULL(count(*),0) 
                FROM tb_favorite 
                WHERE product_code = tb_product.product_code 
                AND user_code = ${connection.escape(data.user_code ? data.user_code : '')} 
            ) > 0
        ,true
        ,false
        ) as favorite, 
        '' as sizes, 
        '' as colors, 
        product_sale_out as sale_out, 
        product_stock as stock 
        FROM tb_product   
        GROUP BY product_code
        ORDER BY product_code  
        `;

        connection.query(str_sql, function (err, res) { 
            if (err) { 
                resolve([]);
            }
            else {
                resolve(res);
            } 
        });
    })
};
module.exports = Task;