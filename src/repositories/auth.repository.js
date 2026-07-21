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

export async function clearRefreshToken(userId) {
    await pool.query(
        `
        UPDATE users
        SET hashed_refresh_token = NULL
        WHERE id = $1;
        `,
        [userId]
    )
}

export async function findUserByGoogleId(googleId){
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE google_id = $1;
        `,
        [googleId]
    )
    return result.rows[0] || null;
}

export async function createGoogleUser(username, email, googleId){
    const result = await pool.query(
        `
        INSERT INTO users
        (username, email, password, google_id)
        VALUES ($1, $2, '', $3)
        ON CONFLICT (email)
        DO UPDATE SET google_id = EXCLUDED.google_id
        RETURNING *;
        `,
        [username, email, googleId]
    )
    return result.rows[0];

}

export async function findUserByGitHubId(githubId) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE github_id = $1;
        `,
        [githubId]
    );

    return result.rows[0] || null;
}

export async function createGitHubUser(username, email, githubId) {
    const result = await pool.query(
        `
        INSERT INTO users
        (username, email, password, github_id)
        VALUES ($1, $2, '', $3)
        ON CONFLICT (email)
        DO UPDATE SET github_id = EXCLUDED.github_id
        RETURNING *;
        `,
        [username, email, githubId]
    );

    return result.rows[0];
}