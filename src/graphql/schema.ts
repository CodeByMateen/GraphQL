export const schema = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    createdAt: String!
    payments: [Payment!]!
  }

  type Payment {
    id: ID!
    userId: Int!
    amount: Float!
    status: PaymentStatus!
    paymentDate: String!
    method: String
    user: User!
  }

  enum PaymentStatus {
    PENDING
    COMPLETED
    FAILED
  }

  type Query {
    hello: String
    helloUser: String
    getUser(id: ID!): User
    getAllUsers: [User!]!
    getPayment(id: ID!): Payment
    getAllPayments: [Payment!]!
    getUserPayments(userId: ID!): [Payment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, phone: String): User!
    createMultipleUsers: [User!]!
    createMultiplePayments: [Payment!]!
  }
`;
