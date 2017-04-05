'use strict'

var mongoose = require('mongoose');
var Course = require('../app/models/course');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

//fs.writeFileSync(path.join(__dirname, './data/'+ id +'.json'), JSON.stringify(temp));

// console.log(path.join(__dirname+'/data/'));
var dbUrl = 'mongodb://localhost/learnsite';
mongoose.Promise = require('bluebird');  
mongoose.connect(dbUrl);

var _course ;

fs.readdir(path.join(__dirname+'/data/'), function(err, files){
  if (err) {
    console.log(err);
  }
  if (!files.length) {
    console.log('No files to show!');
  }
  files.forEach(function(file){
    fs.readFile(path.join(__dirname+'/data/'+file), 'utf8', function(err, data){
      data = JSON.parse(data);
      var course = new Course();
      _course = _.extend(course, data);
      _course.save(function(err, course){
        if (err) {console.log(err);}
        console.log("course"+course.urlid+"已写入");
      })
    });
  })
  console.log("写入完毕");
});