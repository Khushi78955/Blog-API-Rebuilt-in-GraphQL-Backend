import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

import {findUserByGoogleId, createGoogleUser, findUserByGitHubId, createGitHubUser} from "../repositories/auth.repository.js";



if (process.env.GOOGLE_CLIENT_ID) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await findUserByGoogleId(profile.id);

                    if (!user) {
                        user = await createGoogleUser(
                            profile.displayName,
                            profile.emails?.[0]?.value || "",
                            profile.id
                        );
                    }

                    return done(null, user);

                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );
}



if (process.env.GITHUB_CLIENT_ID) {
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALLBACK_URL,
                scope: ["user:email"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await findUserByGitHubId(profile.id);

                    if (!user) {
                        user = await createGitHubUser(
                            profile.username,
                            profile.emails?.[0]?.value || "",
                            profile.id
                        );
                    }

                    return done(null, user);

                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
}



passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});


export default passport;