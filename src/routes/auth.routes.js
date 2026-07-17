import {Router} from "express";
import passport from "../config/passport.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import bcrypt from "bcrypt";
import { updateRefreshToken } from "../repositories/auth.repository.js";

const router = Router();

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

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

export default router;