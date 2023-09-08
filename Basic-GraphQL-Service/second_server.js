// // service1.js

// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Define your GraphQL schema
// const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     email: String!
//   }

//   type Query {
//     getUser(id: ID!): User
//   }

//   type Mutation {
//     signup(username: String!, email: String!, password: String!): String
//     login(email: String!, password: String!): String
//   }
// `;

// // Sample data (replace with database integration)
// const users = [
//   {
//     id: '1',
//     username: 'user1',
//     email: 'user1@example.com',
//     password: 'password1', // Hash this in production
//   },
//   // Add more users here
// ];

// // Define your resolvers
// const resolvers = {
//   Query: {
//     getUser: (parent, { id }) => users.find((user) => user.id === id),
//   },
//   Mutation: {
//     signup: async (parent, { username, email, password }) => {
//       // Hash the password (use bcrypt in production)
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Save the user (replace with database integration)
//       users.push({
//         id: String(users.length + 1),
//         username,
//         email,
//         password: hashedPassword,
//       });

//       // Generate and return a JWT token
//       const token = jwt.sign({ userId: users.length }, process.env.JWT_SECRET);
//       return token;
//     },
//     login: async (parent, { email, password }) => {
//       // Verify user credentials (replace with database integration)
//       const user = users.find((u) => u.email === email);
//       if (!user) throw new Error('User not found');

//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) throw new Error('Invalid password');

//       // Generate and return a JWT token
//       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
//       return token;
//     },
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// server.applyMiddleware({ app });

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}/graphql`);
// });





// // service2.js

// const fs = require('fs-extra');
// const mongoose = require('mongoose');
// const { makeExecutableSchema } = require('graphql-tools');
// const { ApolloServer } = require('apollo-server-express');
// const dotenv = require('dotenv');

// dotenv.config();

// // Define your MongoDB schema models (e.g., User)
// const User = mongoose.model('User', {
//   username: String,
//   email: String,
// });

// // Define your GraphQL type definitions
// const typeDefs = `
//   type User {
//     id: ID!
//     username: String
//     email: String
//   }

//   type Query {
//     getUser(id: ID!): User
//   }
// `;

// // Create an Apollo Server with the schema
// const schema = makeExecutableSchema({ typeDefs });

// const server = new ApolloServer({ schema });

// const port = process.env.PORT || 4001;
// const app = express();

// server.applyMiddleware({ app });

// app.listen(port, () => {
//   console.log(`Service 2 is running on http://localhost:${port}/graphql`);
// });

// // Sync updated GraphQL type definitions to a file (e.g., types.graphql)
// const syncTypeDefs = async () => {
//   const schemaString = await server.graphqlSchemaToTypeDefs(schema);
//   await fs.writeFile('types.graphql', schemaString);
//   console.log('GraphQL type definitions synced to types.graphql');
// };

// // Call syncTypeDefs whenever your schema is updated
// syncTypeDefs();



// // sync-definitions.js

// const fs = require('fs-extra');

// const syncTypeDefs = async () => {
//   try {
//     // Read the updated GraphQL type definitions from Service 2
//     const updatedTypeDefs = await fs.readFile('types.graphql', 'utf-8');

//     // Copy the updated type definitions to Service 1 directory
//     await fs.writeFile('../service1/types.graphql', updatedTypeDefs);

//     console.log('Synced updated GraphQL type definitions to Service 1');
//   } catch (error) {
//     console.error('Error syncing GraphQL type definitions:', error);
//   }
// };

// syncTypeDefs();


const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


async function hashedPassword() {
    try {
      const hash = await bcrypt.hash('ripple_admin', 10);
      console.log(hash);
      return hash;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the async function
  hashedPassword();


// 2023-09-08T07:59:13.101Z
// 1694159953101
// $2b$10$xgZ16zee0ZE5TwVY5mhziuYvHLxRyP2CqxESSaxEskFK1zFFRV7yy


console.log(uuidv4());
console.log(hashedPassword());
console.log(Date.now());
console.log(new Date().toISOString());