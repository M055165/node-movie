let express = require('express')
let router = express.Router()
let con = require('../models/db')

router.get("/all",function(req,res){
    let resultData = "";
    let sql = "select * from running" ;
    console.log(sql)
    con.query(sql,function(err,data,fileds){
    if(err){
      console.log(err)
    }else {
      resData = data;
      console.log(resData);
      res.json(resData)
    }
  })
   })

   router.get("/:id",function(req,res){
    let resultData = "";
    var paramId = parseInt(req.params["id"]);
    let sql = `select * from running where id = ${paramId}`;
    console.log(sql)
    con.query(sql,function(err,data,fileds){
    if(err){
      console.log(err)
    }else {
      resData = data;
      console.log(resData);
      res.json(resData)
    }
  })
   })

   module.exports = router