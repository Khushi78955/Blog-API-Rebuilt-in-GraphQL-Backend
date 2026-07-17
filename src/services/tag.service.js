import { createTag } from "../repositories/tag.repository.js";

export async function createNewTag(name, user){
    if(!user){
        throw new Error("Unauthorized");
    }
    return await createTag(name);
}