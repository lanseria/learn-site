'use strict'
var http = require('http');
var path = require('path');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var async = require('async');
var fs = require('fs');
var superagent = require('superagent');
var superagentcharset = require('superagent-charset');
require('superagent-retry')(superagent);
var _ = require('lodash');
var schedule = require('node-schedule');

const baseUrl = 'http://www.imooc.com/learn/';
const hosts = 'http://www.imooc.com';
var finishid = [];
var encourseid = [];
var nowid = [];
var tasks = [];
var limit = 50;

function filterChapters(html) {
  var $ = cheerio.load(html);
  var chapters = $('div.chapter');
  var cid = $('a#learnOn').attr('href').split('learn/')[1];
  var title = $('div.course-infos h2.l').text().trim();
  var nd = $('div.static-item.l').next().children().eq(1).text();
  var wt = $('div.static-item.l').next().next().children().eq(1).text();
  var description = $('.auto-wrap').text().trim();
  var categary = $('div.path').children('a').eq(1).text();
  var coursetype = $('div.path').children('a').eq(2).text();
  $('div.chapter-info').remove();
  var courseData = {
    urlid: cid,
    title: title,
    categary: categary,
    coursetype: coursetype,
    nd: nd,
    wt: wt,
    description:description,
    chapters:[]
  };
  chapters.each(function(index, item){
    var chapterTitle = $(item).children('h3').children('strong').text().trim();
    var citems = $(item).find('.video').children('li');
    var chapterData = {
      title:chapterTitle.replace(/\s+/g, ''),
      citems:[]
    }
    citems.each(function(index, item){
      var citem = $(item).find('a.J-media-item');
      var citemTitle = citem.text().trim();
      var id = citem.attr('href').split('video/')[1];
      var ctype = 'video/';
      if (id==undefined) {
        ctype = 'code/';
        id = citem.attr('href').split('code/')[1];
      }
      chapterData.citems.push({
        title:citemTitle.replace(/\s+/g, ''),
        type:ctype,
        id:id
      })
    })
    courseData.chapters.push(chapterData);
  })
  return courseData;
}

tasks.push(function(cb){
  finishid = JSON.parse(fs.readFileSync(path.join(__dirname, 'finishid.json')));
  encourseid = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json')));
  fs.exists('./data/', function(isExists){
    if (isExists) {
    }else{
      fs.mkdirSync(path.join(__dirname,'./data/'));
    }
  });
  
  nowid = _.difference(encourseid, finishid);
  cb(null, "完成复制id操作");
})
tasks.push(function(cb){
  nowid = _.remove(nowid, function(n){
    return n-limit <= 0
  })
  cb(null, "完成限制"+limit);
})
tasks.push(function(cb){
  nowid.forEach(function(id){
    finishid.push(id);
    superagent.get(baseUrl+id)
    .set('Content-Type', 'application/plain')
    .retry(3)
    .end(function(err, sres){
      var status = sres.status;
      if (status=='200') {
        var temp = filterChapters(sres.text);
        fs.writeFileSync(path.join(__dirname, './data/'+ id +'.json'), JSON.stringify(temp));
      }
    })
  })
  cb(null, "完成信息过过滤");
})
tasks.push(function(cb){
  fs.writeFileSync(path.join(__dirname, 'finishid.json'), JSON.stringify(finishid));
  cb(null, "以保存完成id");
})

var okid;
okid = setInterval(function(){
  async.series(tasks, function(err, result){
    if (err) {console.log(err);}
    console.log(result);
  })
  if (limit > 850) {
    console.log('定时器取消了,任务完成');
    clearInterval(okid);
  }
  limit += 50;
}, 5000);