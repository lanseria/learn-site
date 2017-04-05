'use strict'
var mongoose = require('mongoose');
var csv = require('node-csv').createParser();
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Userapi = require('../app/models/userapi');

var dbUrl = 'mongodb://localhost/learnsite';
mongoose.Promise = require('bluebird');  
mongoose.connect(dbUrl);

var csvPath = path.join(__dirname+'/user_demo.csv');
var _userapi;
function startcsv(){
  csv.parseFile(csvPath, function(err, data){
    //console.log(data);
    data.forEach(function(item){
      _userapi = new Userapi();
      _userapi.name = item[1].replace(/\s+/g, '');
      _userapi.stunumber = item[6].replace(/\s+/g, '');
      _userapi.gender = item[2].replace(/\s+/g, '');
      _userapi.age = item[3].replace(/\s+/g, '');
      _userapi.college = item[4].replace(/\s+/g, '');
      _userapi.cclass = item[5].replace(/\s+/g, '');
      _userapi.description = item[7].replace(/\s+/g, '');
      _userapi.tel = item[8].replace(/\s+/g, '');
      _userapi.save(function(err, api){
        if (err) {console.log(err);}
        console.log(api.name+'写入完成');
      })
    })
  });
}
startcsv();