let connection = require('./getConnection');

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
    let sql = "select * from doctor_illness where illness="+illnessId;
    return changeDB(sql);
}
//获取当前日期 当前大夫上午的患者列表
function getCurrentDoctorAmWorkList(doctorId,date){

    let sql='select * from appointment where doctor='+doctorId+' and time="上午" and date='+date;
    return changeDB(sql);
}
//获取当前日期 当前大夫下午的患者列表
function getCurrentDoctorPmWorkList(doctorId,date){

    let sql='select * from appointment where doctor='+doctorId+' and time="下午" and date='+date;
    return changeDB(sql);
}
//获取当前大夫当天的工作列表（上午和下午）
// function getCurrentDoctorWorkList(doctorId,date){
//
//     let sql='select * from appointment where doctor='+doctorId+' and time="下午" and date='+date;
//     return changeDB(sql);
// }





//根据题目显示答案
function showAnswer(subject_id){
    let sql = "select * from tbl_exam_choice where subject_id="+subject_id;
    return changeDB(sql);
}
//审核通过
function checked(id){
    let sql="update tbl_exam_subject set checkState ='审核通过' where id="+id;
    return changeDB(sql);
}
//审核不通过
function unchecked(id){
    let sql="update tbl_exam_subject set checkState ='审核不通过' where id="+id;
    return changeDB(sql);
}
//删除题目
function delSubject(id){
    let sql="delete from tbl_exam_subject where id="+id;
    changeDB(sql);
    let sql1="delete from tbl_exam_choice where subject_id="+id;
    return changeDB(sql1);
}
//保存题目
function saveSubject(subjectTypeId,subjectLevelId,departmentId,topicId,stem,answer){
    let sql = "insert tbl_exam_subject(subjectType_id,subjectLevel_id,department_id,topic_id,stem,answer) values("+subjectTypeId+","+subjectLevelId+","+departmentId+","+topicId+",'"+stem+"','"+answer+"')";
    return changeDB(sql);

}
//保存答案
function saveAnswer(choiceContent,choiceCorrect,subject_id){
    for (var i = 0;i < choiceContent.length ; i++){
        var sql1 = "insert tbl_exam_choice(content,correct,subject_id) values('"+choiceContent[i]+"',"+choiceCorrect[i]+","+subject_id+")";
        if(i==3){
            return changeDB(sql1);
        }
        else {
            changeDB(sql1);
        }

    }


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
    getAllDepartment,
    getAllIllness,
    getCurrentDepartmentDoctorList,
    getCurrentIllnessDoctorList,
    // getCurrentDoctorWorkList,
    getCurrentDoctorAmWorkList,
    getCurrentDoctorPmWorkList,
    showAnswer,
    checked,
    unchecked,
    delSubject,
    saveSubject,
    saveAnswer

}
