# learnSite
学习进度平台是一个为大学生社团推出的一个学习平台,帮助管理者更好的管理学员的学习情况.

## 简介

本项目是大学生社团分布式管理系统的子项目,用于其管理学员的学习进度的问题,由于的分布式所以其注册信息都可以从管理系统提供的API利用JSONP跨域获取到,方便学员进行注册.

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

## Installation 安装

## Design 设计

项目主页如下如所示(点击可以查看)

[![项目主页](https://raw.github.com/Lanseria/learnSite/master/docs/images/index.png)](http://learn.limonplayer.cn/index)

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







