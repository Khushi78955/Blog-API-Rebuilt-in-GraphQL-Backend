import { createPost, getPostAuthor, updatePost, deletePost } from "../repositories/post.repository.js";
import { validateTitle, validateContent} from "../utils/validation.js";
import { unauthenticatedError, forbiddenError, notFoundError } from "../utils/errors.js";

export async function createNewPost(title, content, user) {
    if (!user) {
        unauthenticatedError();
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
        unauthenticatedError();
    }
    if(title){
        validateTitle(title);
    }
    if(content){
        validateContent(content);
    }
    const authorId = await getPostAuthor(postId);
    if(authorId === null){
        notFoundError("Post not found");
    }
    if(authorId !== user.id){
        forbiddenError();
    }
    return await updatePost(postId, title, content)
}


export async function deleteExistingPost(postId, user){
    if(!user){
        unauthenticatedError();
    }
    const authorId = await getPostAuthor(postId);
    if(authorId === null){
        notFoundError("Post not found");
    }
    if(authorId !== user.id){
        forbiddenError();
    }
    return await deletePost(postId);
}