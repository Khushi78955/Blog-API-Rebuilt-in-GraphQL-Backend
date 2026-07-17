export const resolvers = {
    Query: {
        hello: () => "Hello GraphQL!",
        user: () => ({
            id: "1",
            username: "Khushi",
            email: "heyitskhushi26@gmail.com"
        })
    }
}