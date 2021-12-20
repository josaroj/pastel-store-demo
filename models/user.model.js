var connection = require('./base.model');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.getUserLogin = function getUserLogin(data) {

    return new Promise(function (resolve) {
        var str_sql = `  SELECT 
                    user_name,
                    user_code,
                    user_lastname,
                    user_email,
                    user_mobile 
                    FROM tb_user  
                WHERE user_username = ${connection.escape(data.user_username)}   
                AND user_password = ${connection.escape(data.user_password)}   
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