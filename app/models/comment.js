var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment');
var comment = mongoose.model('Comment', commentSchema);

module.exports = comment