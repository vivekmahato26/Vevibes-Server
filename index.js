const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const serviceAccount = require("./vevibes-server-firebase-adminsdk-ys9yu-c397f29b60.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const Auth = require("./auth");

async function startApolloServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    context: async ctx => {
      return ctx;
    },
    playground:true
  });
  await server.start();

  const app = express();

  app.use(Auth);

  server.applyMiddleware({app, path: "/", cors: {
    // credentials: true,
    // origin: (origin,callback) => {
    //   const whitelist = [
    //     "https://vebibes.com",
    //     "https://cms.vevibes.com",
    //     "https://app.vevibes.com"
    //   ];
    //   if(whitelist.indexOf(origin) !== -1) {
    //     callback(null,true);
    //   } else {
    //     console.log(origin);
    //     callback(new Error("Blocked By CORS"))
    //   }
    // }
  }});

  await new Promise(resolve => app.listen({ port: process.env.PORT ||4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();