const mongoose    = require('mongoose'),
      bcrypt      = require('bcrypt-nodejs');

var schema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String
});

module.exports = mongoose.model('User', schema);