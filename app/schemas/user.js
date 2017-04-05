var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  name:{
    type: String,
    unique: true
  },
  stunumber: {
    type: String,
  },
  password: String,
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  college: {
    type: String,
  },
  cclass: {
    type: String,
  },
  role: {
    type: Number,
    default: 0
  },
  avatarurl:{
    type: String,
  },
  description:{
    type: String,
  },
  tel:{
    type: String,
  },
  email:{
    type: String,
  },
  pv: {
    type: Number,
    default: 0,
  },
  courses:[{
    courseid: {
      type: ObjectId,
      ref:'Course',
    },
    progress: {
      type: Number,
      default: 0,
    },
    finishAt: {
     type: Date,
      default: Date.now(),
    }
  }],
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
});
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    this.meta.updateAt = Date.now();
    next();
  }
})
UserSchema.methods = {
  comparePassword:function(_password, cb){
    bcrypt.compare(_password, this.password, function(err, isMatch){
      if(err) return cb(err);
      cb(null, isMatch);
    })
  }
}
UserSchema.statics = {
  fetch:function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById:function(id, cb){
    return this
      .findOne({
        _id:id
      })
      .exec(cb);
  }
}
module.exports = UserSchema;