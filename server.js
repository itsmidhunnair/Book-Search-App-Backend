const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { resolvers } = require('./src/resolver/resolvers');
const { typeDefs } = require('./src/schema/typeDefs');

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  });
  console.log(`Server Started: ${url}`);
};

startServer();
