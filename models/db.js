const mysql = require("mysql");
const dbConfig = require("../config/db.config");
function handleError (err) {
    if (err) {
      // 如果是连接断开，自动重新连接
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connect();
      } else {
        console.error(err.stack || err);
      }
    }
    else {
       console.log("數據庫連接連接成功");
    }
  }
var con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});
con.connect(handleError);
con.on('error', handleError);
module.exports = con;
