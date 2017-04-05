'use strict'
var User = require('../models/user');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');
var images = require("images");
var _ = require('lodash');

exports.newArticle = function(req, res){
  var _article = req.body.article;
  console.log(_article);
  _article.user = req.session.user._id;
  _article.mainimgurl = req.mainimg;
  var article = new Article(_article);
  // console.log(article);
  article.save(function(err, article){
    if (err) {console.log(err);}
    return res.redirect(req.headers.referer);
  })
}

exports.tlist = function(req, res){
  var page = parseInt(req.query.p, 10)||0;
  var count = 9;
  var index = page * count;
  User
  .find({})
  .where('role').gte(10)
  .sort('meta.updateAt')
  .exec(function(err, users){
    users = _.sortBy(users, function(user){
      return -user.courses.length;
    });

    var results = users.slice(index, index + count);
    var res_user1 = results.slice(0,3);
    var res_user2 = results.slice(3,6);
    var res_user3 = results.slice(6,9);
    
    res.render('user/rank', {
      sub_title: '教学员',
      sub_description: '这里是你们经常能培训你们的学长学姐',
      users1: res_user1,
      users2: res_user2,
      users3: res_user3,
      currentPage: (page+1),
      totalPage: Math.ceil(users.length/count),
    })
  })
}

exports.info = function(req, res){
  var id = req.params.id;
  var page = parseInt(req.query.p, 10)||0;
  var count = 3;
  var index = page * count;
  User
  .findOne({_id:id})
  .populate('courses.courseid', 'title categary coursetype nd wt')
  .exec(function(err, user){
    var courses = user.courses.slice(index, index + count);
    res.render('user/info', {
      sub_title: user.name+'的成就墙',
      sub_description: '这里你能看到TA完成的所有慕课.',
      courses: courses,
      user: user,
      currentPage: (page+1),
      totalPage: Math.ceil(user.courses.length/count),
    })
  })
}

exports.rank = function(req, res){
  var page = parseInt(req.query.p, 10)||0;
  var count = 9;
  var index = page * count;
  User.fetch(function(err, users){
    users = _.sortBy(users, function(user){
      return -user.courses.length;
    });
    var results = users.slice(index, index + count);
    var res_user1 = results.slice(0,3);
    var res_user2 = results.slice(3,6);
    var res_user3 = results.slice(6,9);
    
    res.render('user/rank', {
      sub_title: '成就排名',
      sub_description: '成就排名是一个对部门人员的考核系统中的其中一个手段，分析每次学习情况，可以被筛选出最好的人员，最积极的人员。',
      users1: res_user1,
      users2: res_user2,
      users3: res_user3,
      currentPage: (page+1),
      totalPage: Math.ceil(users.length/count),
    })
  })
}

exports.article = function(req, res){
  var user = req.session.user;
  User
  .findOne({_id:user._id})
  .populate('courses.courseid', 'title categary coursetype nd wt')
  .exec(function(err, user){
    Article.fetch(function(err, articles){
      res.render('user/article', {
        sub_title: '个人中心',
        sub_description: '这里是'+user.name+'的个人中心',
        courses: user.courses,
        user: user,
        baseurl: req.url,
        articles: articles,
      })
    })
  })
}

exports.center = function(req, res){
  var user = req.session.user;
  User
  .findOne({_id:user._id})
  .populate('courses.courseid', 'title categary coursetype nd wt')
  .exec(function(err, user){
    console.log(user);
    res.render('user/center', {
      sub_title: '个人中心',
      sub_description: '这里是'+user.name+'的个人中心',
      courses: user.courses,
      user: user,
      baseurl: req.url,
    })
  })
}

exports.showSignup = function(req, res){
  res.render('user/signup', {
    sub_title: '注册',
    sub_description: '这里是注册的页面',
  })
}
exports.signup = function(req, res){
  var _user = req.body.user;
  if (req.avatar) {
    _user.avatarurl = req.avatar;
  }
  User.findOne({stunumber:_user.stunumber}, function(err, user){
    if (err) {console.log(err);}
    if (user) {
      console.log(user);
      return res.redirect('/signin');
    }
    else{
      user = new User(_user);
      user.save(function(err, user){
        if (err) {console.log(err);}
        req.session.user = user;
        return res.redirect('/');
      })
    }
  })
}
exports.saveMainimg = function(req, res, next){
  var mainimgData = req.files.inputMainimg;
  var filePath = mainimgData.path;
  var originalFilename = mainimgData.originalFilename;
  if (originalFilename) {
    fs.readFile(filePath, function(err, data){
      var timestamp = Date.now();
      var type = mainimgData.type.split('/')[1];
      var mainimg = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', '/public/upload/mainimg/' + mainimg);
      fs.writeFile(newPath, data, function(err){
        var img = images(newPath).resize(1200);
        images(img, 0, 0, 1200, 350).save(newPath, {
          quality: 100
        })
        req.mainimg = mainimg;
        next();
      });
    });
  }
  else{
    req.mainimg = "mainimg.jpg";
    next();
  }
}
exports.saveAvatar = function(req, res, next){
  var avatarData = req.files.inputAvatar;
  var filePath = avatarData.path;
  var originalFilename = avatarData.originalFilename;
  if (originalFilename) {
    fs.readFile(filePath, function(err, data){
      var timestamp = Date.now();
      var type = avatarData.type.split('/')[1];
      var avatar = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', '/public/upload/avatar/' + avatar);
      fs.writeFile(newPath, data, function(err){
        var img = images(newPath).resize(100);
        images(img, 0, 0, 100, 100).save(newPath, {
          quality: 100
        })
        req.avatar = avatar;
        next();
      });
    });
  }
  else{
    req.avatar = "author.png";
    next();
  }
}
//signin
exports.showSignin = function(req, res){
  res.render('user/signin', {
    sub_title: '登录',
    sub_description: '这里是登录的页面',
  })
}
//signin
exports.signin = function(req, res){
  var _user = req.body.user;
  var stunumber = _user.stunumber;
  var password = _user.password;
  User.findOne({stunumber:stunumber},function(err, user){
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.redirect('/signup');
    }
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err);
      }
      if(isMatch){
        User.update({_id: user._id},{$inc: {pv: 1}}, function(err){
          if (err) {console.log(err);}
          req.session.user = user;
          return res.redirect('/');
        })
      }else{
        return res.redirect('/signin');
      }
    })
  })
}
//logout
exports.logout = function(req, res){
  delete req.session.user;
  //delete app.locals.user;
  res.redirect('/');
}

// middleware for user
exports.signinRequired = function(req, res, next){
  var user = req.session.user;
  if(!user){
    return res.redirect('/signin');
  }
  next();
}