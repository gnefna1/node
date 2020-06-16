let express = require("express")
let router = express.Router()
let connection = require("../sql.js")
let timeFormat = require("../utils/timeFunction/index").timeFormat
router.post("/createOrder",(req,res,next)=>{
    let orders = [req.body.customer, new Date, req.body.type, req.body.count, req.body.price]
    connection.query("insert into orders(customer,time,type,count,price) values(?,?,?,?,?)",orders,function (err,rows,feilds) {
        console.log(err)
        if(err){
            console.log(err)
            let response = {
                code: 1,
                message: "创建订单失败",
                data: "success"
            }
            res.json(response)
        }else{
            let response = {
                code: 0,
                message: "创建订单成功",
                data: "success"
            }
            res.json(response)
        }
    })
})

router.post("/queryOrder",(req,res,next)=>{
    console.log("queryOrder查询开始")
    console.log("queryOrder>req.body",req.body)
    sqlArr = []
    param = []
    let sql = "select * from orders"
    if(req.body.condition){
        Object.keys(req.body.condition).forEach(item => {
            if (req.body.condition[item]){
                sqlArr.push(item)
                param.push(req.body.condition[item])
            }
        });
    }
    console.log("sqlArr", sqlArr)
    if (sqlArr.length){
        sqlArr.forEach((item,index)=>{
            if(index === 0){
                sql = sql + ' where ' + item + '=?'
            } else{
                sql = sql + ' and ' + item + '=?' 
            }
        })
    }
try {
    console.log('queryOrder的sql',sql)
    connection.query(sql, param, function (err, rows, feilds) {
        if (err) {
            console.log("查询orders表报错", err)
            let response = {
                code: 1,
                message: "查询失败",
                data: rows
            }
            res.json(response)
        } else {
            let from = (req.body.pagger.current - 1) * req.body.pagger.size
            let to = req.body.pagger.current * req.body.pagger.size - 1
            let resulte = rows.filter((item,index)=>{
                return index >= from && index <= to
            })
            let response = {
                code: 0,
                message: "查询成功",
                data: {
                    resulte,
                    total : rows.length
                }
            }
            console.log("queryOrder查询成功")
            res.json(response)
        }
    })
} catch (error) {
    console.log("error+",error.message)
}
   
})



router.post("/updateOrder",(req,res,next)=>{
    console.log("updateOrder开始")
    console.log("updateOrder参数",req.body)

    let orders = [req.body.customer, new Date, req.body.type, req.body.count, req.body.price, req.body.id]
    let sql = `update orders set customer='${req.body.customer}', type='${req.body.type}', updateTime='${timeFormat(new Date,"yyyy-MM-dd hh:mm:ss")}', count=${req.body.count}, price=${req.body.price} where id=${req.body.id}`
    console.log("updateOrder的sql",sql)
    try{
        connection.query(sql,orders,(err,rows,feilds)=>{
            if(err){
                console.log(err)
                let response = {
                    code:1,
                    message:"更新失败",
                    data:rows
                }
                res.json(response)
            }else{
                let response = {
                    code:0,
                    message:"更新成功",
                    data:rows
                }
                res.json(response)
            }
        })
    }catch(err){
        console.log("catch err",err)
    }
})

module.exports = router
