import { createNewTag } from "../../services/tag.service.js";

export const tagResolvers = {
    Mutation: {
        createTag: async (__dirname, {name}, context) => {
            return await createNewTag(name, context.user)
        }
    }
}