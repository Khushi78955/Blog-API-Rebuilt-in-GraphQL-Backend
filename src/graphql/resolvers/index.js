export const resolvers = {
    Query: {
        user: () => ({
            id: "1",
            username: "Khushi",
            email: "heyitskhushi26@gmail.com",
            createdAt: new Date().toISOString()
        })
    }
}