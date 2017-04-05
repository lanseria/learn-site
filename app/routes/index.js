'use strict'
var Index = require('../controllers/index');
var Course = require('../controllers/course');
var User = require('../controllers/user');
var Article = require('../controllers/article');
var Api = require('../controllers/api');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(app){
  app.use(function(req, res, next){
    var _user = req.session.user;
    app.locals.user = _user;
    next();
  })
  //api
  app.get('/userapi/:id', Api.user);
  // index page
  app.get('/', Index.index)
  app.get('/index', Index.index)

  app.get('/course/list', Course.list)
  app.get('/course/detail/:id', User.signinRequired, Course.detail)
  app.get('/course/results', Course.search)
  app.get('/course/updateProgress/:cid', Course.updateProgress)
  app.post('/course/applyProgress', Course.applyProgress)

  app.get('/signin', User.showSignin)

  app.post('/user/signin', User.signin)
  app.get('/signup', User.showSignup)

  app.post('/user/signup', multipartMiddleware, User.saveAvatar, User.signup)
  app.get('/logout',User.logout)
  app.get('/user/center',User.center)
  app.get('/user/article',User.article)
  app.get('/user/rank',User.rank)
  app.get('/user/info/:id',User.info)
  app.get('/teachers', User.tlist)

  app.post('/user/newArticle', multipartMiddleware, User.saveMainimg, User.newArticle)

  app.get('/article/info/:id', Article.detail)
  app.get('/article/list', Article.list)

  app.get('/about', Index.about)

}