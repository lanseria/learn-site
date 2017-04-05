var mongoose = require('mongoose');
var userapiSchema = require('../schemas/userapi');
var userapi = mongoose.model('Userapi', userapiSchema);

module.exports = userapi