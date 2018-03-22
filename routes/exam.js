var express = require('express');
var router = express.Router();
let examDB = require('../db/examDB');

/*
  以下是前端系统的api
*/

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

                if(theDoctor.length==dateList.length){
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
    var name=req.body.name;
    var age=req.body.age;
    var gender=req.body.gender;
    var card_id=req.body.card_id;
    examDB.addUser(name,card_id,age,gender).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦啦啦啦！！！")
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

router.post('/registration', function(req, res, next) {
    var appointmentDate=req.body.appointmentDate;
    var appointmentTime=req.body.appointmentTime;
    var appointmentDoctorId=req.body.appointmentDoctorId;
    var appointmentUserId=req.body.appointmentUserId;

    examDB.registration(appointmentDate,appointmentTime,appointmentDoctorId,appointmentUserId).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错！！！")
    });
});

/*
  以下是管理系统的api
*/

// 登录
router.post('/login', function(req, res, next) {
    var params = req.body;
    examDB.login(params).then((result)=>{
      console.log(result[0])
      res.send(result[0]);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});


// 获取用户信息
router.get('/getUser', function(req, res, next) {
    var name = req.query.name;
    var page = req.query.page;
    var data = {};

    examDB.getUserMount(name, page).then((result)=>{
      data.total = result[0].total
        examDB.getUser(name, page).then((result)=>{
            data.data = result;
            res.send(data);
        }).catch((err)=>{
            console.log("笨蛋，错啦！！！")
        });
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});

// 编辑用户
router.post('/editUser', function(req, res, next) {
    var params = req.body;
    examDB.editUser(params).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});

// 删除用户
router.get('/deleteUser', function(req, res, next) {
    var userId = req.query.id;
    examDB.deleteUser(userId).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});

// 获取大夫信息
router.get('/getDoctor', function(req, res, next) {
  var name = req.query.name;
  var page = req.query.page;
  var data = {};
  // console.log(name,page)

  examDB.getDoctorMount(name, page).then((result)=>{
    data.total = result[0].total
      examDB.getDoctor(name, page).then((result)=>{
          data.data = result;
          res.send(data);
      }).catch((err)=>{
          console.log("笨蛋，错啦啊！")
      });
  }).catch((err)=>{
      console.log("笨蛋，错啦！！！")
  });
});


// 删除大夫
router.get('/deleteDoctor', function(req, res, next) {
    var DoctorId = req.query.id;
    examDB.deleteDoctor(DoctorId).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
// 增加大夫
router.post('/addDoctor', function(req, res, next) {
    var name=req.body.name;
    var age=req.body.age;
    var gender=req.body.gender;
    var department=req.body.department;
    examDB.addDcotor(name,department,age,gender).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦啦啦啦！！！")
    });
});
// 编辑用户
router.post('/editDoctor', function(req, res, next) {
    var params = req.body;
    examDB.editDoctor(params).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});

// 获取科室信息
router.get('/getDepartment', function(req, res, next) {
    var name = req.query.name;
    var page = req.query.page;
    var data = {};
    examDB.getDepartmentMount(name, page).then((result)=>{
      data.total = result[0].total
      examDB.getDepartment(name, page).then((result)=>{
          data.data = result;
          res.send(data);
      }).catch((err)=>{
          console.log("笨蛋，错啦")
      });
    }).catch((err)=>{
        console.log("笨蛋，错啦！！")
    });
});

// 删除科室
router.get('/deleteDepartment', function(req, res, next) {
    var departmentId = req.query.id;
    examDB.deleteDepartment(departmentId).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
// 增加科室
router.post('/addDepartment', function(req, res, next) {
    var name=req.body.name;
    var banner=req.body.banner;
    examDB.addDepartment(name,banner).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦啦啦啦！！！")
    });
});

// 编辑科室
router.post('/editDepartment', function(req, res, next) {
    var params = req.body;
    examDB.editDepartment(params).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});






// 获取病症信息
router.get('/getIllness', function(req, res, next) {
    var name = req.query.name;
    var page = req.query.page;
    var data = {};
    examDB.getIllnessMount(name, page).then((result)=>{
      data.total = result[0].total
      examDB.getIllness(name, page).then((result)=>{
          data.data = result;
          res.send(data);
      }).catch((err)=>{
          console.log("笨蛋，错啦")
      });
    }).catch((err)=>{
        console.log("笨蛋，错啦！！")
    });
});

// 删除病症
router.get('/deleteIllness', function(req, res, next) {
    var illnessId = req.query.id;
    examDB.deleteIllness(illnessId).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});
// 增加病症
router.post('/addIllness', function(req, res, next) {
    var name=req.body.name;
    var banner=req.body.banner;
    examDB.addIllness(name,banner).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦啦啦啦！！！")
    });
});

// 编辑病症
router.post('/editIllness', function(req, res, next) {
    var params = req.body;
    examDB.editIllness(params).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});







// 获取预约信息
router.get('/getAppointment', function(req, res, next) {
    var name = req.query.name;
    var page = req.query.page;
    var data = {};

    examDB.getAppointmentMount(name, page).then((result)=>{
      data.total = result[0].total
        examDB.getAppointment(name, page).then((result)=>{
            data.data = result;
            res.send(data);
        }).catch((err)=>{
            console.log("笨蛋，错啦！")
        });
    }).catch((err)=>{
        console.log("笨蛋，错啦哟！！！")
    });
});

// 编辑预约
// router.post('/editUser', function(req, res, next) {
//     var params = req.body;
//     examDB.editUser(params).then((result)=>{
//       res.send(result);
//     }).catch((err)=>{
//         console.log("笨蛋，错啦！！！")
//     });
// });

// 删除预约
router.get('/deleteAppointment', function(req, res, next) {
    var appointmentId = req.query.id;
    examDB.deleteAppointment(appointmentId).then((result)=>{
      res.send(result);
    }).catch((err)=>{
        console.log("笨蛋，错啦！！！")
    });
});



// 获取疾病信息,这个 api 前端也有，不需要再加了

// 获取预约信息
// router.get('/getAppointment', function(req, res, next) {
//     examDB.getAppointment().then((result)=>{
//         res.send(result);
//     }).catch((err)=>{
//         console.log("笨蛋，错啦")
//     });
// });




module.exports = router;
