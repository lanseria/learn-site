var config = {
  web: {
    title: "学习进度平台",
    memu: [
      {
        name: "主页", 
        url: '/index',
      }, 
      { 
        name: "部门信息", 
        url: '/classinfo',
      }, 
      {
        name: "成就排名", 
        url: '/user/rank', 
      }, //homePage
      {
        name: "教学员", 
        url: '/teachers'
      }, 
      {
        name: "学员手记", 
        url: '/article/list'
      },
      {
        name: "社团论区", 
        url: 'http://nodebb.limonplayer.cn/'
      },
      {
        name: "关于我们", 
        url: '/about'
      },
      // {
      //   name: "联系我们", 
      //   url: '/contact'
      // },
    ],
    theme_color: "yellow"
  },
};

module.exports = config;