const { ApolloServer} = require('apollo-server');

const typeDefs = require("./graphql/schema");
const {resolver} = require("./graphql/resolvers");




const server = new ApolloServer({ typeDefs, resolver });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
    