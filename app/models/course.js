var mongoose = require('mongoose');
var courseSchema = require('../schemas/course');
var course = mongoose.model('Course', courseSchema);

module.exports = course