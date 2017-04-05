var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CourseSchema = new Schema({
  urlid: {
    type: String,
  },
  title: {
    type: String,
  },
  categary: {
    type: String,
  },
  coursetype: {
    type: String,
  },
  nd:{
    type: String,
  },
  wt:{
    type: String,
  },
  description:{
    type: String,
  },
  chapters:[{
    title: {
      type: String,
    },
    citems: [{
      title: {
        type: String,
      },
      id: {
        type: String,
      },
      type: {
        type: String,
      },
    }],
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
CourseSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
})
CourseSchema.statics = {
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
module.exports = CourseSchema;