var mongoose = require('mongoose');
var userSchema = require('../schemas/user');
var user = mongoose.model('User', userSchema);

module.exports = user