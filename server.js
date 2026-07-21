import "dotenv/config";

import express from "express";
import cors from "cors"

import {ApolloServer} from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./src/graphql/schema/typeDefs.js";
import { resolvers } from "./src/graphql/resolvers/index.js";

import {connectDB} from "./src/db/db.js"
import { createUserLoader } from "./src/loaders/user.loader.js";
import {authenticate} from "./src/middleware/auth.middleware.js"

import session from "express-session";
import passport from "./src/config/passport.js";

import authRoutes from "./src/routes/auth.routes.js";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    },
}))

app.use(passport.initialize());
app.use(passport.session())

app.use("/auth", authRoutes);

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