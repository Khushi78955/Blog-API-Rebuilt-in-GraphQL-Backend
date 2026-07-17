import { createNewPost } from "../../services/post.service.js";

export const postResolvers = {
    Mutation: {
        createPost: async (_, { title, content }, context) => {
            return await createNewPost(title, content, context.user);
        },
    },
};