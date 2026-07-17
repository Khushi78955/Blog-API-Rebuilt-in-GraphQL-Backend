import { createPost, getPostAuthor, updatePost, deletePost } from "../repositories/post.repository.js";
import { validateTitle, validateContent} from "../utils/validation.js";

export async function createNewPost(title, content, user) {
    if (!user) {
        throw new Error("Unauthorized");
    }

    validateTitle(title);
    validateContent(content);

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


export async function updateExistingPost(postId, title, content, user){
    if(!user){
        throw new Error("Unauthorized");
    }
    if(title){
        validateTitle(title);
    }
    if(content){
        validateContent(content);
    }
    const authorId = await getPostAuthor(postId);
    if(authorId === null){
        throw new Error("Post not found");
    }
    if(authorId !== user.id){
        throw new Error("Forbidden");
    }
    return await updatePost(postId, title, content)
}


export async function deleteExistingPost(postId, user){
    if(!user){
        throw new Error("Unauthorized");
    }
    const authorId = await getPostAuthor(postId);
    if(authorId === null){
        throw new Error("Post not found");
    }
    if(authorId !== user.id){
        throw new Error("Forbidden");
    }
    return await deletePost(postId);
}