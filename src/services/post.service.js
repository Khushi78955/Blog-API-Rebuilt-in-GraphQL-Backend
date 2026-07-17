import { createPost } from "../repositories/post.repository.js";

export async function createNewPost(title, content, user) {
    if (!user) {
        throw new Error("Unauthorized");
    }

    const slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    return await createPost(
        title,
        content,
        slug,
        user.id
    );
}