import { getAllUsers } from "../../repositories/user.repository.js"

export const resolvers = {
    Query: {
        users: async () => {
            return await getAllUsers();
        }
    }
}