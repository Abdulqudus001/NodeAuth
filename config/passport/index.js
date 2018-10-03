// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

var User       = require('../../models/user');

var myLocalConfig = (passport) => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, username, password, done) {
            console.log('login');
            if (username)
                username = username.toLowerCase(); // Use lower-case usernames to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function() {
                User.findOne({ 'username' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false);

                    if (!user.validPassword(password))
                        return done(null, false);

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, username, password, done) {
            if (username)
                username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function() {
                // if the user is not already logged in:
                if (!req.user) {
                    User.findOne( {'username' :  username}, function(err, user) {
                        // if there are any errors, return the error
                        if (err)
                        console.log('an error?');
                            return done(err);
                        console.log('just another log');
                        // check to see if theres already a user with that email
                        if (user === null) {
                            console.log('Already exists')
                            return done(null, false);
                        } else {
                            console.log('No user yet');
                            // create the user
                            var newUser            = new User();

                            newUser.username    = username;
                            newUser.password = newUser.generateHash(password);

                            newUser.save(function(err) {
                                console.log('Saved');
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }

                    });
                    // if the user is logged in but has no local account...
                } else if ( !req.user.username ) {
                    // ...presumably they're trying to connect a local account
                    // BUT let's check if the username used to connect a local account is being used by another user
                    User.findOne({ 'username' :  username }, function(err, user) {
                        if (err)
                        console.log('3');
                            return done(err);

                        if (user) {
                            console.log('2');
                            return done(null, false);
                            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                        } else {
                            console.log('1');
                            var user = req.user;
                            user.username = username;
                            user.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null,user);
                            });
                        }
                    });
                } else {
                    console.log('Already logged in')
                    // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });

        }));
};

module.exports = myLocalConfig;