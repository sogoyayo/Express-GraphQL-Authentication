const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        username: String!
        email: String!
        password: String!
        token: String
    }

    input RegisterInput {
      username: String!
      email: String!
      password: String!
      confirm_pass: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
      Users: [User]
    }

    type Mutation {
      signup(registerInput: RegisterInput!): User
      login(loginInput: LoginInput!): User
    }

`;

module.exports = typeDefs;
