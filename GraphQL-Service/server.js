const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolver');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/constant');

const app = express();
const port = PORT || 4000;

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start()

  server.applyMiddleware({ app, path: "/graphql" });

  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);

}

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    startApolloServer();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });


// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
