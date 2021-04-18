let mysql = require('mysql')
let express = require("express");
let app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
let cookieParser = require("cookie-parser")
let session = require('express-session')

app.use(cors({
  origin: ['http://192.168.43.145:8080'],
}))
app.use(cookieParser());
app.use(session({
  secret:'abc',
  resave:true,
  saveUninitialized:true
}))
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



  let running  = require('./routes/running.js')
  app.use('/running',running)
  let comming  = require('./routes/comming.js')
  app.use('/comming',comming)
  let user  = require('./routes/user.js')
  app.use('/user',user)
  let order  = require('./routes/order.js')
  app.use('/order',order)



   
  const PORT = process.env.PORT || 8800;
  app.listen(PORT,() => {
    console.log("服務器啟動完成");
  });
