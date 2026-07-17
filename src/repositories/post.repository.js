import { pool } from "../db/db.js";

export async function getAllPosts(){
    const result = await pool.query(
        `
        SELECT *
        FROM posts
        ORDER BY id;
        `
    )
    return result.rows.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        authorId: post.author_id
    }))
}


export async function getPostById(id){
    const result = await pool.query(
        `
        SELECT *
        FROM posts
        WHERE id = $1
        `,
        [id]
    )
    if(result.rows.length === 0){
        return null;
    }

    const post = result.rows[0];
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        authorId: post.author_id,
    }
}


export async function createPost(title, content, slug, authorId){
    const result = await pool.query(
        `
        INSERT INTO posts
        (title, content, slug, author_id)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
        [title, content, slug, authorId]
    );
    const post = result.rows[0];
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        authorId: post.author_id,
    }
}