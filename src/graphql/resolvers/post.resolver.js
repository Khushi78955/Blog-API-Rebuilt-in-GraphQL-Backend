import { createNewPost, updateExistingPost, deleteExistingPost } from "../../services/post.service.js";

export const postResolvers = {
    Mutation: {
        createPost: async (_, { title, content }, context) => {
            return await createNewPost(title, content, context.user);
        },
        updatePost: async (_, {id, title, content}, context) => {
            return await updateExistingPost(
                id, 
                title,
                content,
                context.user
            )
        },
        deletePost: async (_, { id }, context) => {
            return await deleteExistingPost(
                id,
                context.user
            );
        },
    }
};