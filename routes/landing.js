const express       = require('express'),
      router        = express.Router(),
      passport      = require('passport'),
      flash         = require('connect-flash'),
      bcrypt        = require('bcrypt-nodejs'),
      passportLocal = require('passport-local').Strategy,
      User          = require('../models/user');

/************************************
      Handling routes
************************************/
router.get('/',(req,res) => {
  res.render('landing');
});

router.get('/register', (req,res) => {
  res.render('register',{message: req.flash('mismatch')});
});

router.get('/home', (req,res) => {
  res.render('home',{message: req.flash('welcome')});
});

//Method handling user registration
router.post('/register', (req,res) => {
  if(req.body.password === req.body.confirm) { //Perform check to ensure passwords fields are the same
    let passKey = req.body.password;
    bcrypt.genSalt(10, (err,salt) => { //generating salt using bcrypt
      bcrypt.hash(passKey,salt,null,(err,hash) => { //Hashing the password
        let newUser = {
          username: req.body.username,
          password: hash,
          salt: salt
        } //Create new user 
        User.create(newUser,(err,saved) => { //Saving new user to db
          if(err){
            console.log(err);
          } else {
            req.flash('welcome','Welcome to my node revision class')
            res.redirect('/home'); //redirect to home page
          }
        })
      });
    });
  } else {
    req.flash('mismatch','Passwords do not match')
    res.redirect('/register')
  }
});

router.get('/login', (req,res) => {
  res.render('login');
});

//Method handling user login 
router.post('/login',(req,res) => {
  User.findOne({username:req.body.username},(err,user) => {
    if(err){
      console.log('User not found')
    } else {
      bcrypt.compare(req.body.password,user.password,(err,response) => {
        if(response){
          req.flash('welcome','Welcome to my node revision class')
          res.redirect('/home'); //redirect to home page
        }
      })
    }
  })
})
module.exports = router;