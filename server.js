import express from "express";
import cors from "cors"

import {ApolloServer} from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./src/graphql/schema/typeDefs.js";
import { resolvers } from "./src/graphql/resolvers/index.js";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
})