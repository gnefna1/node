let express = require("express")
let router = express.Router()
var connection = require("../sql.js")

var jwt = require("jsonwebtoken")
router.post("/",function (req,res,next) {
    connection.query(`select * from user where username=? AND password=?`,[req.body.username,req.body.password],function (err,rows,feilds) {
        console.log("登陆错误",err)
        if(rows && rows.length){
            let content = { name: req.body.username, password: req.body.password}//要生成token的主体信息
            let secretOrPrivateKey = "suiyi"//加密的key
            let token = jwt.sign(content,secretOrPrivateKey,{
                expiresIn:60*60*60
            })
            let response = {
                code: 0,
                message: "success",
                data: token
            }
            res.json(response)
        }else{
            let response = {
                code: 10,
                message: "用户名或者密码错误",
                data: rows
            }
            res.json(response)
        }
    })
})

router.post("/test",function (req,res,next) {
    let response = {
        code:0,
        data:"success",
        message:"success"
    }
    res.json(response)
})

module.exports = router