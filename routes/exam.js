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
    let doctorId=req.query.doctorId;
    let dateList=['2017-12-22','2017-12-23','2017-12-24','2017-12-25','2017-12-26','2017-12-27','2017-12-28'];
    let theDoctor=[];

    for(let item of dateList){
        let work={};
        work.date=item;

        examDB.getCurrentDoctorAmWorkList(doctorId,item).then((result)=>{
            //这里规定每个大夫每个时间段最多只能诊断20个病人
            work.am=20-result.length;
        }).catch((err)=>{
            console.log("笨蛋，错啦！！！")
        });

        examDB.getCurrentDoctorPmWorkList(doctorId,item).then((result)=>{
            //这里规定每个大夫每个时间段最多只能诊断20个病人
            work.pm=20-result.length;
        }).catch((err)=>{
            console.log("笨蛋，错啦！！！")
        });

        theDoctor.push(work);
    }
    res.send(JSON.stringify(theDoctor));






});

router.get('/showAnswer', function(req, res, next) {
    var subjectid=req.query.subjectid;
    examDB.showAnswer(subjectid).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });

});

router.get('/checked', function(req, res, next) {
    var id=req.query.id;
    examDB.checked(id).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
router.get('/unchecked', function(req, res, next) {
    var id=req.query.id;

    examDB.unchecked(id).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
router.get('/delSubject', function(req, res, next) {
    var id=req.query.id;

    examDB.delSubject(id).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
router.post('/saveSubject', function(req, res, next) {
    var subjectTypeId=req.body.subjectTypeId;
    var subjectLevelId=req.body.subjectLevelId;
    var departmentId=req.body.departmentId;
    var topicId=req.body.topicId;
    var stem=req.body.stem;
    var answer=req.body.answer;
    examDB.saveSubject(subjectTypeId,subjectLevelId,departmentId,topicId,stem,answer).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错！！！")
    });
});
router.post('/saveAnswer', function(req, res, next) {
    var choiceContent = req.body.choiceContent;
    var choiceCorrect =req.body.choiceCorrect;
    var subject_id =req.body.subject_id;
    examDB.saveAnswer(choiceContent,choiceCorrect,subject_id).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错le！！！")
    });
});

module.exports = router;
