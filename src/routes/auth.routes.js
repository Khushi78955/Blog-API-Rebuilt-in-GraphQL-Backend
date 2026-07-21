import {Router} from "express";
import passport from "../config/passport.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import bcrypt from "bcrypt";
import { updateRefreshToken } from "../repositories/auth.repository.js";

const router = Router();

router.get("/google", (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(400).json({
            message: "Google OAuth not configured"
        });
    }

    passport.authenticate("google", {
        scope: ["profile", "email"]
    })(req, res, next);
});



router.get("/google/callback", passport.authenticate("google", {
        failureRedirect: "/",
        session: true
    }),
    async (req, res) => {
        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await updateRefreshToken(req.user.id, hashedRefreshToken);
        res.json({
            accessToken,
            refreshToken,
            user: {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email
            }
        })
    }
)

router.get("/github", (req, res, next) => {
    if (!process.env.GITHUB_CLIENT_ID) {
        return res.status(400).json({
            message: "GitHub OAuth not configured"
        });
    }

    passport.authenticate("github", {
        scope: ["user:email"]
    })(req, res, next);
});


router.get("/github/callback", passport.authenticate("github", {
        failureRedirect: "/",
        session: true
    }),
    async (req, res) => {
        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await updateRefreshToken(req.user.id, hashedRefreshToken);
        res.json({
            accessToken,
            refreshToken,
            user: {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email
            }
        })
    }
)


export default router;