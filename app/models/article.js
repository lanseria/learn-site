var mongoose = require('mongoose');
var articleSchema = require('../schemas/article');
var article = mongoose.model('Article', articleSchema);

module.exports = article