//Importing modules
const express       = require('express'),
      bodyparser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      flash         = require('connect-flash'),
      session       = require('express-session'),
      app           = express();

//Setiing up database using mongoDB ORM
mongoose.connect('mongodb://127.0.0.1:27017/CMS',{useNewUrlParser: true});

require('./config/passport')(passport);

//Importing routes
const indexRoute    = require('./routes/landing.js')

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: true}));

//Configuring passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/',indexRoute);

//Creating server
app.listen(8080,() => {
  console.log('Listening at port 8080');
});