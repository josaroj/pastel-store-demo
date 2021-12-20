var connection = require('./base.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.getProductSizeBy = function getProductSizeBy(data) {
    return new Promise(function (resolve) {
        var str_sql = ` SELECT product_size 
        FROM tb_product_size  
        WHERE product_code = ${connection.escape(data.id)} 
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