var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")

// var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var registerRouter = require("./routes/register")
var loginRouter = require("./routes/login")
var orderRouter = require("./routes/order")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
let filterRouter = ["/login", "/queryUserName", "/queryUserName/register"]
app.use(function (req, res, next) {
  if (!!~filterRouter.indexOf(req.path)){
    next()
  }else{
    if (req.headers.authorization) {
      try {
        jwt.verify(req.headers.authorization,"suiyi",function (err,decoded) {
          // console.log("需要验证的token", req.headers.authorization)
          if(err){
            console.log('token验证出错信息',err)
            res.json({code:401,message:"token过期"})
            next()
          }else{
            console.log('token信息',decoded)
            next()
          }
        })
      } catch (error) {
        console.log("token验证信息捕获错误",error)
        next()
      }
    } else {
      res.json({code:401,message:"没有token"})
    }
  }
})

// app.use(expressJwt({
//   secret: "suiyi"
// }).unless({
//   path: filterRouter
// }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/queryUserName', registerRouter);
app.use('/login', loginRouter);
app.use('/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// res  code data message 
