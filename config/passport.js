require("dotenv").config()
const UserModel =require("../models/userModel")
const passport =require("passport")
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("this is the "+jwt_payload.payload._id)
    UserModel.findOne({_id: jwt_payload.payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {console.log(user)
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));