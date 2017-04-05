var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ArticleSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  mainimgurl: {
    type: String,
  },
  description:{
    type: String,
  },
  content:{
    type: String,
  },
  pv: {
    type: Number,
    default: 0
  },
  recom: {
    type: Number,
    default: 0
  },
  judge: {
    type: Number,
    default: 0
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
ArticleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
})
ArticleSchema.statics = {
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
module.exports = ArticleSchema;