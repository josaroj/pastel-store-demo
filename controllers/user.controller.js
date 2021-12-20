var userModel = require('../models/user.model.js');

var Task = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getUserLoginBy = async function getUserLoginBy(data) {
    if (data.user_username && data.user_password) {
        var _data = await userModel.getUserLogin(data);
        return _data;
    } else {
        return [];
    }
}



module.exports = Task;