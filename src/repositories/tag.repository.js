import {pool} from "../db/db.js";

export async function getAllTags(){
    const result = await pool.query(
        `
        SELECT *
        FROM tags
        ORDER BY id
        `
    )
    return result.rows;
}