'use strict'
var superagent = require('superagent');
var superagentcharset = require('superagent-charset');
require('superagent-retry')(superagent);
var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');

const baseUrl = 'http://www.imooc.com/learn/';
const startid = 819;

const filename = './url.data';
var Sumid = new Array();
var Delid = new Array();
var Selid = new Array();
var tasks = [];
function compare(v1, v2){
  return v1 - v2;
}
tasks.push(function(cb){
  var i = 0;
  while(i<=startid){
    Sumid.push(i);
    i++;
  }
  cb(null, "完成任务规定数量任务");
})

tasks.push(function(cb){
  Selid = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json')));
  Delid = JSON.parse(fs.readFileSync(path.join(__dirname, 'unen.json')));
  // console.log(Selid);
  // console.log(Delid);
  let temparr = Selid.concat(Delid);
  Sumid = _.difference(Sumid, temparr);
  cb(null, "完成任务去重任务");
})

tasks.push(function(cb){
  Sumid.forEach(function(id){
    superagent.get(baseUrl+id)
    .set('Content-Type', 'application/json')
    .retry(3)
    .end(function(err, sres){
      var status = sres.status;
      if (status=='200') {
        Selid.push(id);
      }
      else{
        Delid.push(id);
      }
    })
  })
  
  cb(null, "完成筛选任务");
})
tasks.push(function(cb){
  Selid.sort(compare);
  Delid.sort(compare);
  fs.writeFileSync(path.join(__dirname, 'en.json'), JSON.stringify(Selid));
  fs.writeFileSync(path.join(__dirname, 'unen.json'), JSON.stringify(Delid));
  cb(null, "完成任务完成写入任务");
})
async.series(tasks, function(err, result){
  if (err) {console.log(err);}
  console.log(result);
})