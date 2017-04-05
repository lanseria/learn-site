var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserapiSchema = new Schema({
  name:{
    type: String,
    unique: true
  },
  stunumber: {
    type: String,
  },
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
  description:{
    type: String,
  },
  tel:{
    type: String,
  },
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
UserapiSchema.pre('save', function (next) {
  var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
})

UserapiSchema.statics = {
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
module.exports = UserapiSchema;