let connection = require('./getConnection');

/*
  以下是前端系统操作数据库的方法
*/

//获取科室列表
function getAllDepartment(){
    let sql = "select * from department";
    return changeDB(sql)
}
//获取病症列表
function getAllIllness(){
    let sql = "select * from illness";
    return changeDB(sql);
}
//获取当前科室的所有大夫
function getCurrentDepartmentDoctorList(departmentId){
    let sql = "select * from doctor where department="+departmentId;
    return changeDB(sql);
}
//获取当前病症的所有大夫
function getCurrentIllnessDoctorList(illnessId){
    let sql = "select a.doctor,b.name from doctor_illness as a inner join doctor as b on a.doctor=b.id where illness="+illnessId;
    return changeDB(sql);
}
//获取当前日期 当前大夫上午的患者列表
function getCurrentDoctorAmWorkList(doctorId,date){

    let sql='select * from appointment where doctor='+doctorId+' and time="上午" and date="'+date+'"';
    return changeDB(sql);
}
//获取当前日期 当前大夫下午的患者列表
function getCurrentDoctorPmWorkList(doctorId,date){

    let sql='select * from appointment where doctor='+doctorId+' and time="下午" and date="'+date+'"';
    return changeDB(sql);
}
//新增用户
function addUser(userName,userCardId,userAge,userGender){
    let sql='insert into user(name,card_id,age,gender) values("'+userName+'",'+userCardId+',"'+userAge+'","'+userGender+'")';
    return changeDB(sql);
}
//查询新增用户的id
function selectUserId(card_id) {
    let sql='select * from user where card_id='+card_id;
    return changeDB(sql);
}
//挂号
function registration(appointmentDate,appointmentTime,appointmentDoctorId,appointmentUserId) {
    let sql='insert into appointment(date,time,doctor,user) values("'+appointmentDate+'","'+appointmentTime+'",'+appointmentDoctorId+','+appointmentUserId+')';
    return changeDB(sql);
}

/*
  以下是管理系统操作数据库的方法
*/
// 获取用户信息
function getUser(name,page){
    var start = (page-1)*10;
    if (name) {
      var sql = "select * from user where name like '%"+name+"%' limit "+start+",10;";
    } else {
      var sql = "select * from user limit "+start+",10;";
    }
    return changeDB(sql)
}
// 获取患者信息
function getDoctor(){
    let sql = "select * from doctor";
    return changeDB(sql)
}
// 获取 预约 信息
function getAppointment(){
    let sql = "select * from appointment";
    return changeDB(sql)
}





//操作数据库
function changeDB(sql){
    return new Promise((resolve,reject)=>{
        connection().then((connection)=>{
            connection.query(sql,(err,result)=>{
                if(!err){
                    resolve(result);
                    //释放链接
                    connection.release();
                }
                else{
                    reject(err);
                    connection.release();

                }
            })
        }).catch((err)=>{
            reject(err);
        })
    })
}
//测试

// showSubject(1,1,1,1).then((result)=>{
//     console.log(result);
// })
module.exports={
    /*
      以下是前端操作数据库的方法
    */
    getAllDepartment,
    getAllIllness,
    getCurrentDepartmentDoctorList,
    getCurrentIllnessDoctorList,
    getCurrentDoctorAmWorkList,
    getCurrentDoctorPmWorkList,
    addUser,
    selectUserId,
    registration,

    /*
      以下是管理系统操作数据库的方法
    */

    getUser,
    getDoctor,
    getAppointment
}
