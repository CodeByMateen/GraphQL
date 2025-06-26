import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./graphql/schema";

dotenv.config();
const PORT = Number(process.env.PORT);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      hello: () => "Hello, World!",
      helloUser: () => "Hello, User!",
      getUser: () => {
        return {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
        };
      },
    },
  },
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`🚀 Server is running at ${url}`);
});
