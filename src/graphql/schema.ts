export const schema = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello: String
    helloUser: String
    getUser: User
  }
`;
