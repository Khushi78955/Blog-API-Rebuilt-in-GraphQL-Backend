import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { createUserLoader } from "./loaders/user.loader.js";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
    context: async () => ({
        userLoader: createUserLoader()
    })
}));