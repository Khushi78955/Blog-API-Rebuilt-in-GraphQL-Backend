import {gql} from "graphql-tag"

export const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
    }

    type Tag {
        id: ID!
        name: String!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        slug: String!
        createdAt: String!
        updatedAt: String!

        author: User!
        tags: [Tag!]!
    }

    type AuthPayload {
        accessToken: String!
        refreshToken: String!
        user: User!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User

        posts: [Post!]!
        post(id: ID!): Post

        tags: [Tag!]!
    }

    type Mutation {
        register(
            username: String!
            email: String!
            password: String!
        ): AuthPayload!

        login(
            email: String!
            password: String!
        ): AuthPayload!

        refreshToken(
            refreshToken: String!
        ): AuthPayload!

        createPost(
            title: String!
            content: String!
        ): Post!

        updatePost(
            id: ID!
            title: String
            content: String
        ): Post!

        logout(
            refreshToken: String!
        ): Boolean!

        deletePost(id: ID!): Boolean!
        createTag(name: String!): Tag!
    }

`