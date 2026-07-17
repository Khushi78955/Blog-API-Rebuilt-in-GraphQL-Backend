import { getAllUsers, getUserById } from "../../repositories/user.repository.js"
import { getAllPosts, getPostById } from "../../repositories/post.repository.js";
import { getAllTags } from "../../repositories/tag.repository.js";

export const resolvers = {
    Query: {
        users: async () => {
            return await getAllUsers();
        },
        user: async (_, {id}) => {
            return await getUserById(id);
        },
        posts: async () => {
            return await getAllPosts();
        },
        post: async (_, {id}) => {
            return await getPostById(id);
        },
        tags: async () => {
            return await getAllTags();
        }
    }
}