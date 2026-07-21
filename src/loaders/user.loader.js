import DataLoader from "dataloader";

import { getUsersByIds } from "../repositories/user.repository.js";

export function createUserLoader(){
    return new DataLoader(async (userIds) => {
        const users = await getUsersByIds(userIds);
        const userMap = new Map();
        users.forEach((user) => {
            userMap.set(user.id, {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            })
        })
        return userIds.map((id) => userMap.get(id) || null);
    })
}