var mysql = require('mysql'); 

var connection = mysql.createConnection({
    connectionimit: 100,
    host: 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'wtm5nle5uslqeauo',
    port: 3306,
    password: 'vdegpj73hdvic9h7',
    database: 'gi3vt9hqa4x6dosl', 
    multipleStatements: true
});

 
connection.connect();

module.exports = connection;