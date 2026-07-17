import {register, login, refresh, logout} from "../../services/auth.service.js"

export const authResolvers = {
    Mutation: {
        register: async (_, { username, email, password }) => {
            return await register(username, email, password);
        },
        login: async (_, {email, password}) => {
            return await login(email, password)
        },
        refreshToken: async (_, { refreshToken }) => {
            return await refresh(refreshToken);
        },
        logout: async (_, { refreshToken }) => {
            return await logout(refreshToken);
        },
    }
}