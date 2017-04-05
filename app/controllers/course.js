var Course = require('../models/course');
var User = require('../models/user');
var _ = require('lodash');
var async = require('async');

//applyProgress

exports.applyProgress = function(req, res){
  var _course = req.body.course;
  var _user = req.session.user;
  User
  .findById(_user._id, function(err, user){
    var course = {
      courseid: _course.courseid,
      progress: _course.progress,
      finishAt: Date.now(),
    };
    var progress = _.result(_.find(_user.courses, {courseid:_course.courseid}), 'progress')||0;
    console.log(progress);
    if(progress==0){
      user.courses.push(course);
      user.save(function(err, user){
        if (err) {console.log(err);}
        req.session.user = user;
        return res.redirect(req.headers.referer)
      })
    }else{
      _.remove(user.courses, function(item){
        return item.courseid == course.courseid;
      })
      user.courses.push(course);
      user.set({courses: user.courses});
      user.save();
      req.session.user = user;
      return res.redirect(req.headers.referer);
    }
  })
}
//updateProgress
exports.updateProgress = function(req, res){
  var cid = req.params.cid;
  var user = req.session.user;
  Course.findById(cid, function(err, course){
    if (err) {console.log(err);}
    var progress = _.result(_.find(user.courses, {courseid:cid}), 'progress')||0;
    res.render('course/updateProgress', {
      cid: course._id,
      sub_title: course.title,
      sub_description: course.description,
      progress: progress,
      nd: course.nd,
      wt: course.wt,
    });
  })
}

//search
exports.search = function(req, res){
  var q = req.query.q;
  var page = parseInt(req.query.p, 10)||0;
  var count = 30;
  var index = page * count;

  Course
  .find({
    title: new RegExp((q + '.*'), 'i')
  })
  .exec(function(err, courses){
    if(err){
      console.log(err);
    }
    var results = courses.slice(index, index + count);
    res.render('course/list', {
      sub_title: q+'课程',
      sub_description: '有关'+q+'相关课程',
      currentPage: (page+1),
      query: 'q='+ q,
      totalPage: Math.ceil(courses.length/count),
      courses: results
    })
  })
}

exports.list = function(req, res){
  var page = parseInt(req.query.p, 10)||0;
  var count = 30;
  var index = page * count;
  Course
  .find({})
  .exec(function(err, courses){
    if (err) {console.log(err);}
    var courses = courses || {};
    var results = courses.slice(index, index + count);
    res.render('course/list', {
      sub_title: '课程',
      sub_description: '这里的课程抓取于慕课网IMOOC',
      courses: results,
      currentPage: (page+1),
      totalPage: Math.ceil(courses.length/count),
    });
  })
}

exports.detail = function(req, res){
  var id = req.params.id;
  var user = req.session.user;
  Course
  .findOne({_id: id})
  .exec(function(err, course){
    var progress = _.result(_.find(user.courses, {'courseid':id}), 'progress')||0;
    res.render('course/detail', {
      cid: course._id,
      sub_title: course.title,
      sub_description: course.description,
      urlid: course.urlid,
      chapters: course.chapters,
      progress: progress,
    })  
  })
}