var express = require("express")
var router = express.Router()
var connection = require("../sql.js")

router.post("/",(req,res,next)=>{
    connection.query("select username from user where username=?",req.body.val,(err,rows,feilds)=>{
        let response = {
            code: 0,
            data: rows,
        }
        response.message = rows.length ? "用户名被占用" : ""
        res.json(response)
    })
    
})

router.post("/register",(req,res,next)=>{
    let param = req.body
    connection.query("insert into user(username,password,email) values(?,?,?)", [param.username,param.password,param.email],(err,rows,feilds)=>{
        let response = {
            code: 0,
            data: '注册成功',
            message: "success"
        }
        res.json(response)
    })
    
    
})

module.exports = router