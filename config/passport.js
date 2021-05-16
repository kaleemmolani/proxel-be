var GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../modal/user');

module.exports = function(passport){
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECERET);
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECERET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, cb) =>{
        console.log(profile);
        const newUser  = {
            googleId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.familyName,
            lastName:profile.name.givenName,
            image:profile.photos[0].value
        }

        try {
            let user =await User.findOne({googleId:profile.id});
            if(user){
                cb(null,user)
            }else{
                user = await User.create(newUser)
                cb(null,user)
            }
        } catch (error) {
            console.error(error);
        }
        
      }
    ));
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });
}
