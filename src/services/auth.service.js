import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { findUserByEmail, createUser, updateRefreshToken, clearRefreshToken} from "../repositories/auth.repository.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"

export async function register(username, email, password){
    const existingUser = await findUserByEmail(email);
    if(existingUser){
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await updateRefreshToken(
        user.id,
        hashedRefreshToken
    )

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at
        }
    }
}




export async function login(email, password) {
    const user = await findUserByEmail(email);
    if(!user){
        throw new Error("Invalid email or password");
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await updateRefreshToken(user.id, hashedRefreshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at
        }
    }
}




export async function refresh(refreshToken){
    let payload;
    try{
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
        throw new Error("Invalid refresh token");
    }

    const user = await findUserByEmail(payload.email);
    if(!user){
        throw new Error("User not found");
    }

    const isValidRefreshToken = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!isValidRefreshToken){
        throw new Error("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await updateRefreshToken(user.id, hashedRefreshToken);

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at,
        },
    };
}



export async function logout(refreshToken){
    let payload;
    try{
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch {
        throw new Error("Invalid refresh token");
    }

    const user = await findUserByEmail(payload.email);
    if(!user){
        throw new Error("User not found");
    }

    const isValidRefreshToken = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!isValidRefreshToken){
        throw new Error("Invalid refresh token");
    }

    await clearRefreshToken(user.id);
    return true;
}