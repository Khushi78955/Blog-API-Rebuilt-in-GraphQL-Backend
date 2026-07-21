import { createTag } from "../repositories/tag.repository.js";
import { validateTagName } from "../utils/validation.js";
import {unauthenticatedError} from "../utils/errors.js";

export async function createNewTag(name, user){
    if(!user){
        unauthenticatedError();
    }
    validateTagName(name);
    return await createTag(name);
}