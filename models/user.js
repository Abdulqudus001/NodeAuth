const mongoose    = require('mongoose'),
      bcrypt      = require('bcrypt-nodejs');

var schema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true
  },
  password:{
    type: String,
    lowercase: true,
    required: true
  },
  passwordRestToken: String,
  passwordTokenExprires: Date,
  salt: String
});

module.exports = mongoose.model('User', schema);