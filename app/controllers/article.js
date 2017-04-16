'use strict'
var fs = require('fs');
var path = require('path');
var images = require("images");
var _ = require('lodash');
var User = require('../models/user');
var Article = require('../models/article');

exports.list = function(req, res){
  var page = parseInt(req.query.p, 10)||0;
  var count = 9;
  var index = page * count;
  Article
  .find({})
  .populate('user', 'name role _id')
  .exec(function(err, articles){
    var articles = articles.slice(index, index + count);
    res.render('article/list', {
      sub_title: '成员手记',
      sub_description: '这里是你们的笔记可以展示的地方',
      articles: articles,
      currentPage: (page+1),
      totalPage: Math.ceil(articles.length/count),
    })
  })
}
exports.detail = function(req, res){
  var id = req.params.id;
  Article.findById(id, function(err, article){
    User.findById(article.user, function(err, user){
      Article.update({_id: id},{$inc: {pv: 1}}, function(err){
        res.render('article/detail', {
          muser: user,
          article: article,
        })
      })
    })
  })
}

