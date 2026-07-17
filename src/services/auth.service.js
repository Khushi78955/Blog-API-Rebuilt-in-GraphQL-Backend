import bcrypt from "bcrypt"

import { findUserByEmail, createUser, updateRefreshToken} from "../repositories/auth.repository.js"
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