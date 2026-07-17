import {pool} from "../db/db.js";

export async function findUserByEmail(email) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    )
    return result.rows[0] || null;
}


export async function createUser(username, email, password) {
    const result = await pool.query(
        `
        INSERT INTO users(username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [username, email, password]
    )
    return result.rows[0];
}


export async function updateRefreshToken(userId, hashedRefreshToken) {
    await pool.query(
        `
        UPDATE users
        SET hashed_refresh_token = $1
        WHERE id = $2;
        `,
        [hashedRefreshToken, userId]
    )
}

