var mysql = require("mysql")
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"anfeng0323",
    database:"freedoom"
})

connection.connect()

module.exports = connection