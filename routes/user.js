let express = require('express')
let router = express.Router()
let con = require('../models/db')
router.post('/login',function(req,res){
    let reqData = req.body;
    let resData ='';
    let sql = `select * from user where account = '${reqData['account']}' and password = '${reqData['password']}'`
    console.log(sql)
    con.query(sql,function(err,data){
      if(err){
        console.log(err)
      }else { 
      
       if(data.length>0){ //帳號與密碼存在，登入成功
         resData ={
           result:'ok',
           message:'login ok',
           data:data
         };
         req.session.login='true'
         res.send(resData)
       } else {
         resData ={
           result:'error',
           message:'Please check your userAccount or password is correct!',
           data:''
         };
         res.send(resData)
       }
      }
    })
  })

  router.post('/register',function(req,res){
   let reqData = req.body;
   let resData ='';
   let sql = `select * from user where account = '${reqData['account']}' `
   con.query(sql,function(err,data){
     if(err){
       console.log(err)
     }else { 
      if(data.length>0){ //此帳號已存在,註冊失敗
        resData ={
          result:'error',
          message:'此帳號已存在，請重新輸入其他帳號！',
          data:''
        };
        res.send(resData)
      } else {  //此帳號尚未有人註冊，可進行註冊
        let sql = `insert into user (account,password) values ("${reqData.account}","${reqData.password}")`
        con.query(sql,function(err,data){
          if(err){
            console.log(err)
          }else {
            console.log(data)
            resData = {
              result:'ok',
              message:'帳號註冊成功！',
              data:data
            }
          }
        })
        res.send(resData)
      }
     }
   })
   console.log(sql)
 })

 module.exports = router;
