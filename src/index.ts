import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./graphql/schema";
import { getUser, getAllUsers, createUser, createMultipleUsers } from "./services/user";
import { getAllPayments } from "./services/payments";

dotenv.config();
const PORT = Number(process.env.PORT);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      hello: () => "Hello, World!",
      helloUser: () => "Hello, User!",
      getUser: (_, { id }) => getUser(id),
      getAllUsers: () => getAllUsers(),
      getAllPayments: () => getAllPayments(),
    },
    Mutation: {
      createUser: (_, { name, email, phone }) => createUser(name, email, phone),
      createMultipleUsers: () => createMultipleUsers(),
    },
  },
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`🚀 Server is running at ${url}`);
});
