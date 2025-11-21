const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Create Apollo Server instance
const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
        extensions: {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        },
      };
    },
    introspection: process.env.NODE_ENV !== 'production', // Enable playground in dev
  });

  await server.start();
  return server;
};

module.exports = { createApolloServer, expressMiddleware };
