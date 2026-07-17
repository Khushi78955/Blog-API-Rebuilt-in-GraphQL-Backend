import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findUserByGoogleId, createGoogleUser } from "../repositories/auth.repository.js";

import { Strategy as GitHubStrategy } from "passport-github2";

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


passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await findUserByGoogleId(profile.id);
            if (!user) {
                user = await createGoogleUser(
                    profile.username,
                    profile.emails?.[0]?.value || "",
                    profile.id
                );
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    })
);

export default passport;