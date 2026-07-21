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

export async function getTagsByPostId(postId) {
    const result = await pool.query(
        `
        SELECT
            tags.id,
            tags.name
        FROM tags
        INNER JOIN post_tags
            ON tags.id = post_tags.tag_id
        WHERE post_tags.post_id = $1
        ORDER BY tags.id;
        `,
        [postId]
    )
    return result.rows;
    
}

export async function createTag(name) {
    const result = await pool.query(
        `
        INSERT INTO tags(name)
        VALUES($1)
        RETURNING *;
        `,
        [name]
    );
    return result.rows[0];
}