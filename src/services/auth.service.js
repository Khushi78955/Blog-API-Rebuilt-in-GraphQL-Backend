import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { findUserByEmail, createUser, updateRefreshToken, clearRefreshToken} from "../repositories/auth.repository.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
import { validateEmail, validatePassword, validateUsername } from "../utils/validation.js";

import {badUserInputError, unauthenticatedError, notFoundError} from "../utils/errors.js";
export async function register(username, email, password){

    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    const existingUser = await findUserByEmail(email);
    if(existingUser){
        badUserInputError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    if(!user){
        notFoundError("User not found");
    }
    
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
            createdAt: user.created_at ? user.created_at.toISOString() : null
        }
    }
}

export async function login(email, password) {

    validateEmail(email);
    validatePassword(password);

    const user = await findUserByEmail(email);
    if(!user){
        unauthenticatedError("Invalid email or password");
    }
    if (!user.password) {
        unauthenticatedError("Please login using OAuth");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        unauthenticatedError("Invalid email or password");
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
            createdAt: user.created_at ? user.created_at.toISOString() : null
        }
    }
}

export async function refresh(refreshToken){
    let payload;
    try{
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
        unauthenticatedError("Invalid refresh token");
    }

    const user = await findUserByEmail(payload.email);
    if(!user){
        notFoundError("User not found");
    }
    if (!user.hashed_refresh_token) {
        unauthenticatedError("Invalid refresh token");
    }

    const isValidRefreshToken = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!isValidRefreshToken){
        unauthenticatedError("Invalid refresh token");
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
            createdAt: user.created_at ? user.created_at.toISOString() : null,
        },
    };
}

export async function logout(refreshToken){
    let payload;
    try{
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch {
        unauthenticatedError("Invalid refresh token");
    }

    const user = await findUserByEmail(payload.email);
    if(!user){
        notFoundError("User not found");
    }
    if (!user.hashed_refresh_token) {
        unauthenticatedError("Invalid refresh token");
    }

    const isValidRefreshToken = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!isValidRefreshToken){
        unauthenticatedError("Invalid refresh token");
    }

    await clearRefreshToken(user.id);
    return true;
}