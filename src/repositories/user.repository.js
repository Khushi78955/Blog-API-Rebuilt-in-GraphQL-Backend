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
        createdAt: user.created_at
    }));
}


export async function getUserById(id){
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    )
    if(result.rows.length === 0){
        return null;
    }

    const user = result.rows[0];
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at
    }
}


export async function getUserByAuthorId(authorId){
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [authorId]
    )
    if(result.rows.length === 0){
        return null;
    }

    const user = result.rows[0];
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at,
    };
}


export async function getUsersByIds(ids) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = ANY($1::int[]);
        `,
        [ids]
    );
    return result.rows;
}