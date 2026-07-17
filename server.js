import express from "express";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config();

import {ApolloServer} from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./src/graphql/schema/typeDefs.js";
import { resolvers } from "./src/graphql/resolvers/index.js";

import {connectDB} from "./src/db/db.js"
import { createUserLoader } from "./src/loaders/user.loader.js";
import {authenticate} from "./src/middleware/auth.middleware.js"

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
    context: async ({ req }) => {
        const user = authenticate(req);
        return {
            user, userLoader: createUserLoader(),
        };
    },
})
);

const PORT = process.env.PORT || 4000;

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
})