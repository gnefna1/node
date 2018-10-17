var express = require("express");
var app =express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));  
app.get("/",function(req,res){
    res.send("Hello Word!");
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})


// mysql的连接
var mysql = require('mysql');

// 本地连接
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'anfeng0323',
//     database:"freedoom"
// });

// 服务器连接
var connection = mysql.createConnection({
    host: '101.37.148.8',
    user: 'user',
    password: 'User?123',
    database:"freedoom"
});
connection.connect();
app.post("/selectUsername",bodyParser.json(),function (req,res) {
    connection.query(`select username from user where username='${req.body.val}'`,function (err,rows,fields) {
        if (rows && rows.length){
            res.json(true)
        }else{
            res.json(false)
        }
    })
})

app.post("/", bodyParser.json(), function (req, res) {
    if (req.body.username && req.body.password && req.body.email && req.body.password == req.body.repassword ){
        let selectUsernameSql = `select username from user where username='${req.body.username}'`
        let insertUserSql = `insert into user (username,password,email) values ('${req.body.username}','${req.body.password}','${req.body.email}')`
        connection.query(selectUsernameSql, function (err, rows, fields) {
            if(rows && rows.length){
                res.json("fail")
            }else{
                connection.query(insertUserSql, function (err, rows, fields) {
                    if (err) {
                        res.json("fail")
                    }
                    res.json("sucess")
                });
            }
        })
        
    }
});


app.post("/login", bodyParser.json(), function (req, res) {
    if (req.body.username && req.body.password){
        let selectUsernameSql = `select username,id from user where username='${req.body.username}' and password='${req.body.password}'`
        connection.query(selectUsernameSql, function (err, rows, fields) {
            console.log(rows)
            if(rows && rows.length){
                res.json(rows)
            }else{
                res.json("fail")
            }
        })
    }
});

// `updata user set (password,email) values('${}')`


var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s",port,host)
});