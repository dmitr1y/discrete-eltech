var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleToken = require('./access');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: googleToken.googleCallbackURLLogin,
        clientSecret: googleToken.googleClientSecret,
        callbackURL: googleToken.googleCallbackURLLogin
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({googleId: profile.id}, function (err, user) {
            return done(err, user);
        });
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', select.passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'}));

app.get('/auth/google/callback', function () {
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/fail'
    });
});
app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});