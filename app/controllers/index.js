var Course = require('../models/course');
var Article = require('../models/article');
var Promise = require('bluebird');

exports.index = function(req, res){
  Course
  .find({}, function(err, courses){
    var total = courses.length;
    var promises = [];
    var skip;
    for (var i = 0; i < 3; i++) {
      skip = Math.round(Math.random()*total);
      promises.push(Course.find({}).skip(skip).limit(1).exec());
    }
    Promise.all(promises).then(function (results){
      Article.find({}).sort('meta.updateAt').limit(4).exec(function(err, articles){
        res.render('index', {
          results: results,
          articles: articles,
        });
      })
    })
  })
}
exports.about = function(req, res){
  res.render('about', {
    
  });
}

exports.classinfo = function(req, res){
  res.render('classinfo', {
    
  });
}