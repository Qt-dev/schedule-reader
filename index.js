var csvReader = require("./lib/csv-reader");
var express = require("express");
var passport = require("passport");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var GKeys = require("./keys/gapi.js");
 
var app = express();
passport.use(new GoogleStrategy({
    clientID:     GKeys.client_id,
    clientSecret: GKeys.client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    profile.token = {
        accessToken: accessToken,
        refreshToken: refreshToken
    };

    done(err, profile);
  }
));

global.passport = passport;


// Enable passport
app.use(passport.initialize()); // initializes passport for the request
app.use(passport.session());    // attempts to login via session


var config = {
  port: 3000
};


var router = require(__dirname + "/config/routes");
app.use("/", router);

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');

app.set("port",  process.env.PORT || config.port);
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});
