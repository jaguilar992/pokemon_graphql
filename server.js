import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { connectDB } from "./src/database/index.js";
import { typeDefs, resolvers } from "./src/schema/index.js";

const PORT = 8080;
const app = express();
const server = http.createServer(app);

const apolloServer = new ApolloServer({
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
	typeDefs,
	resolvers,
})

await apolloServer.start();
app.use(
	cors(),
	express.json(),
	expressMiddleware(apolloServer, {
		context: ({ req }) => ({ req }),
	})
)

app.get("/health", (req, res) => {
	res.status(200).json({
		live: true,
		time: new Date().toLocaleString(),
		appName: "Music Server GraphQL"
	})
})

await connectDB();
await new Promise((resolve) => server.listen({ port: PORT }, resolve));
console.log(`Server running on port ${PORT}`);