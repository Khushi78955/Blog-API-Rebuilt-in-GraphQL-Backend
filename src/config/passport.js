import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { findUserByGoogleId, createGoogleUser } from "../repositories/auth.repository.js";

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            let user = await findUserByGoogleId(profile.id);
            if(!user){
                user = await createGoogleUser(
                    profile.displayName,
                    profile.emails[0].value,
                    profile.id
                )
            }
            return done(null, user);
        } catch(err){
            return done(err, null);
        }
    }
))


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

export default passport;