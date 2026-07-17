import { createTag } from "../repositories/tag.repository.js";
import { validateTagName } from "../utils/validation.js";

export async function createNewTag(name, user){
    if(!user){
        throw new Error("Unauthorized");
    }
    validateTagName(name);
    return await createTag(name);
}