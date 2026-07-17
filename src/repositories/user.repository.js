import { pool } from "../db/db.js";

export async function getAllUsers(){
    const result = await pool.query(
        `
        SELECT *
        FROM users
        ORDER BY id;
        `
    )
    return result.rows.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_atwo
    }));
}