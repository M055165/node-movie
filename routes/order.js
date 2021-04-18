let express = require('express')
let router = express.Router()
let con = require('../models/db')
router.post('/add',function(req,res){
    let reqData = req.body;
    let resData ='';
    console.log(reqData)
    let api = `insert into myorder (seatinfo,moviecount,movieprice,movietotalprice,timechoose,datechoose,movieename,movietname,account,timestamp) values ('${reqData.seatInfo}','${reqData.movieCount}',${reqData.moviePrice},${reqData.movieTotalPrice},'${reqData.timeChoose}','${reqData.dateChoose}','${reqData.movieEname}','${reqData.movieTname}','${reqData.user}',${reqData.timestamp})`;
    console.log(api)
    con.query(api,function(err,data){
      if(err){
        console.log(err)
      }else {
        resData = {
          status:'ok',
          message:"order adding successs!",
          data:data
        }
        
        res.send(resData)
      }
    })
  })
  router.get('/:account',function(req,res){
    let resultData = "";
    var paramAccount = (req.params["account"]);
    let sql = `select * from myorder where account = '${paramAccount}'`;
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

  router.post('/delete',function(req,res){
    console.log("刪除")
    let resultData = '';
    let reqData = req.body;
    let sql = `delete from myorder where id = ${reqData.id}`;
    con.query(sql,function(err,data){
      if(err){
        console.log(err)
      }else {
        resultData = data;
        console.log(resultData)
        res.json(resultData)
      }
    })
  })

  router.get('/page/:page',function(req,res){
    let resultData = "";
    var paraPage = (req.params["page"]);
    let num = 7*(parseInt(paraPage)-1)+(parseInt(paraPage));
    let sql = `Select * From myorder Limit ${num},8 `;
    console.log(sql)
    con.query(sql,function(err,data){
      if(err){
        console.log(err)
      }else {
        resultData = data;
        console.log(resultData)
        res.json(resultData)
      }
    })
  })

  module.exports = router;
