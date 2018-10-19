//Importing modules
const express       = require('express'),
      bodyparser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      flash         = require('connect-flash'),
      session       = require('express-session'),
      dotenv        = require('dotenv').config(),
      app           = express();
//Setiing up database using mongoDB ORM
mongoose.connect(process.env.mlab_url,{useNewUrlParser: true});

require('./config/passport')(passport);

//Importing routes
const indexRoute    = require('./routes/landing.js')

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: true}));
//Configuring passport
app.use(session({
  key: 'users',
  secret: 'ilovescotchscotchyscotchscotch',
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/',indexRoute);

//Creating server
app.listen(8080,() => {
  console.log('Listening at port 8080');
});