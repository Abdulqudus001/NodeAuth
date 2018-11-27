//Importing modules
const express       = require('express'),
      bodyparser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      flash         = require('connect-flash'),
      session       = require('express-session'),
      mysql           = require('mysql'),
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
// Connecting to mysql database
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: process.env.sql_user,
//   password: process.env.sql_pass
// });

// con.connect((err) => {
//   if (err) {
//     console.log(process.env.sql_user);
//     console.log(process.env.sql_pass);
//     console.log('Failed to connect',err);
//   } else {
//     console.log('Connected successfully');
//     con.query('create database clinicManagement',(err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Database successfully created');
//       }
//     });
//   }
// });

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/',indexRoute);

//Creating server
let port = process.env.port || 9001;
app.listen(port,() => {
  console.log(`Listening at port ${port}`);
});