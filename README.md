# learnSite
学习进度平台是一个为大学生社团推出的一个学习平台,帮助管理者更好的管理学员的学习情况.

## 简介

本项目是[大学生社团分布式管理系统](#)的子项目,用于其管理学员的学习进度的问题,由于是分布式系统的原因,所以其注册信息都可以从管理系统提供的API利用JSONP跨域获取到,方便学员进行注册.
1. 项目后端的搭建 :

- 使用`NodeJs`的`express`框架完成网站后端搭建; 
- 使用`mongodb`完成数据存储,通过mongoose模块完成对mongodb数据的构建;使用pug模板引擎完成页面创建渲染;
- 使用`Moment.js`格式化电影存储时间;

2. 项目前端搭 :

- 使用jQuery和Bootsrap完成网站前端JS脚本和样式处理;
- 使用validate.js完成对账号登录注册的判断;
- 前后端的数据请求交互通过Ajax完成;
- 跨域的数据请求交互通过Ajax中的jsonp完成;

3.本地环境的搭建 : 

- 开发环境在windows10下完成
- 运行在ubuntu 16 下,并通过nginx端口代理完成域名与服务器的连接

## Design 设计

项目主页如下如所示(点击可以查看)

[![项目主页](https://raw.github.com/Lanseria/learnSite/master/docs/images/index.png)](http://learn.limonplayer.cn/index)

[![项目部分截图](https://raw.github.com/Lanseria/learnSite/master/docs/images/index.png)](http://learn.limonplayer.cn/index)



### 详细功能

本项目由学习进度`course`和文章发表`article`两大功能 .
- 其中具有重要特色的功能是慕课网信息的爬取与使用`spider` , 利用`superagent`插件.
- 其次具有简单的用户登录和注册`user` , 用户的头像上传
- 对用户的学习进度进行排序`rank`(可以比较出学员的积极性)
- 对课程`course`的搜索`search`
- 还有对每个列表页面进行分页`page`处理
- 访客次数统计`pv`

### 项目结构:
```
├── app.js            项目入口文件
├── app               Node后端MVC文件目录
│   ├── routes        路由目录
│   ├── controllers   控制器目录
│   │   ├── api       API页面控制器目录
│   │   ├── index     主页页面控制器目录
│   │   ├── user      用户页面控制器目录
│   │   ├── article   文章页面控制器目录
│   │   └── course    课程列表控制器目录
│   ├── models        模型目录
│   │   ├── user
│   │   ├── userapi
│   │   ├── article
│   │   ├── comment
│   │   └── course
│   ├── schemas       模式目录
│   │   ├── user
│   │   ├── userapi
│   │   ├── article
│   │   ├── comment
│   │   └── course
│   └── views         视图文件目录
│       ├── includes
│       ├── pages
│       └── layout.pug

├── db                供参考的数据库数据
│   └── learnsite
├── node_modules      node模块目录
├── public            静态文件目录
│   ├── css           样式目录
│   ├── fonts         字体目录
│   ├── images        静态图片目录
│   ├── js            JS脚本目录
│   ├── upload        用户自定义上传图片存储目录
│   │   ├── avatar    用户头像图片目录
│   │   └── mainimg   文章主图片目录
│   └favicon.png      favicon
├── spider_imooc      爬虫文件目录
│   └── data          已爬取的json文件目录
├── README.md
├── gruntfile.js      grunt文件
└── package.json
```
## 运行环境及Node版本:

- 目前在windows10下以及ubuntu 16下都能很好运行,当然[nodejs](https://nodejs.org/en/)不能是最新7的版本

- 安装[mongodb](https://www.mongodb.org/downloads#production)完成相关配置;

- 在当前项目目录中使用npm install命令安装相关模块(如果模块下载速度慢可考虑使用淘宝cnpm镜像进行下载);

## Installation 安装

- 首先对node与mongo进行安装
- 通过`mongorestore -d dbs -dir path  `进行数据库的导入
- 接着安装插件`npm install`
- `forever start app.js `对应用进行后台处理
- 如果需要nginx进行代理则设置相应的代理



## Thanks for 感谢
<p align="center">
  <img alt="Node.js" src="https://nodejs.org/static/images/logo-light.svg" width="400"/>
</p>
本项目基于[Nodejs](https://nodejs.org/en/)

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

以[Express](http://expressjs.com/)作为web框架

用了[mongo](http://mongodb.com)为数据库,并用[mongoose](http://mongoosejs.com/)作为连接插件

## 所有的npm插件如下

    "async": "^2.2.0",
    "bcrypt": "^1.0.2",
    "bluebird": "^3.5.0",
    "body-parser": "^1.17.1",
    "cheerio": "^0.22.0",
    "connect-mongo": "^1.3.2",
    "connect-multiparty": "^2.0.0",
    "cookie-parser": "^1.4.3",
    "express": "^4.15.2",
    "express-session": "^1.15.1",
    "grunt": "^1.0.1",
    "grunt-concurrent": "^2.3.1",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-nodemon": "^0.4.2",
    "images": "^3.0.0",
    "lodash": "^4.17.4",
    "moment": "^2.18.1",
    "mongoose": "^4.9.2",
    "morgan": "^1.8.1",
    "node-csv": "^0.1.2",
    "node-schedule": "^1.2.1",
    "node-tesseract": "^0.2.7",
    "node-xlsx": "^0.7.4",
    "pug": "^2.0.0-beta11",
    "serve-favicon": "^2.4.2",
    "superagent": "^3.5.2",
    "superagent-charset": "^1.1.1",
    "superagent-retry": "^0.6.0",
    "trim": "0.0.1"







