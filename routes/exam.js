var express = require('express');
var router = express.Router();
let examDB = require('../db/examDB');

router.get('/getAllDepartment', function(req, res, next) {
    examDB.getAllDepartment().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
router.get('/getAllIllness', function(req, res, next) {
    examDB.getAllIllness().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
router.get('/getCurrentDepartmentDoctorList', function(req, res, next) {
    let departmentId=req.query.departmentId;
    examDB.getCurrentDepartmentDoctorList(departmentId).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
router.get('/getCurrentIllnessDoctorList', function(req, res, next) {
    let illnessId=req.query.illnessId;
    examDB.getCurrentIllnessDoctorList(illnessId).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，你又错啦！！！")
    });
});


router.get('/getCurrentDoctorWorkList', function(req, res, next) {
    let theDoctor=[];
    let doctorId=req.query.doctorId;
    let dateList=['2017-12-22','2017-12-23','2017-12-24','2017-12-25','2017-12-26','2017-12-27','2017-12-28'];

    for(let index in dateList){
        let work={};
        work.date=dateList[index];
        examDB.getCurrentDoctorAmWorkList(doctorId,dateList[index]).then((result)=>{
            //这里规定每个大夫每个时间段最多只能诊断20个病人
            work.am=20-result.length;

            examDB.getCurrentDoctorPmWorkList(doctorId,dateList[index]).then((result)=>{
                //这里规定每个大夫每个时间段最多只能诊断20个病人
                work.pm=20-result.length;

                theDoctor.push(work);

                if(index==dateList.length-1){
                    res.send(theDoctor);
                }

            }).catch((err)=>{
                console.log("笨蛋，错啦！！！")
            });

        }).catch((err)=>{
            console.log("笨蛋，错啦！！！")
        });
    }

});

router.post('/addUser', function(req, res, next) {
    // console.log(req.body);
    var name=req.body.name;
    var age=req.body.age;
    var gender=req.body.gender;
    var card_id=req.body.card_id;
    examDB.addUser(name,card_id,age,gender).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错！！！")
    });
});

router.get('/selectUserId', function(req, res, next) {
    let card_id=req.query.card_id;
    examDB.selectUserId(card_id).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，你又错啦！！！")
    });
});




module.exports = router;
