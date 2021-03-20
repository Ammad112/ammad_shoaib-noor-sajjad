const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt=require('bcryptjs')
const User = require("../models/User");

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use("login", new LocalStrategy(
    {usernameField:'email',passwordField:'password'},
    function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "No user has that username!" });
      }

      
      if(bcrypt.compareSync(password,user.password)){
        
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password." });
        }
      

  });

}))
}