var Userapi = require('../models/userapi');

exports.user = function(req, res){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET,POST");
  var stunumber = req.params.id;
  var _callback = req.query.callback;
  Userapi.findOne({stunumber: stunumber}, function(err, user){
    if (_callback) {
      res.type('text/javascript');
      res.send(_callback+"("+JSON.stringify(user)+")");
    }
    else{
      res.json(user);
    }
  })
}
////动态执行回调函数  
// $callback=$_GET['callback'];  
// echo $callback."($result)"; 