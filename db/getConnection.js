let mysql = require("mysql");
let pool = global.pool;
if(!pool){
    pool = mysql.createPool({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'root',
        database:'registration'
    });
    global.pool=pool;
}

function getConnection(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(!err){
                resolve(connection);
            }
            else{
                reject(err);
            }
        })
    });
}
module.exports=getConnection;