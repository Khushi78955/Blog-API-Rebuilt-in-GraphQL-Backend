import { getAllUsers, getUserById, getUserByAuthorId } from "../../repositories/user.repository.js"
import { getAllPosts, getPostById } from "../../repositories/post.repository.js";
import { getAllTags, getTagsByPostId } from "../../repositories/tag.repository.js";
import { authResolvers } from "./auth.resolver.js";


export const resolvers = {
    Query: {
        users: async () => await getAllUsers(),
        user: async (_, {id}) => await getUserById(id),
        posts: async () => await getAllPosts(),
        post: async (_, {id}) => await getPostById(id),
        tags: async () => await getAllTags()
    },  
    Mutation: {
        ...authResolvers.Mutation
    },
    Post: {
        author: async (parent, _, context) => {
            return await context.userLoader.load(parent.authorId);
        },
        tags: async (parent) => {
            return await getTagsByPostId(parent.id);
        },
    },
}