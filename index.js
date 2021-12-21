
const serviceAccount = require("./firebaseService.json");

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = require("./auth");

const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const { gql } = require('apollo-server-express');

const typeDefs = require("./graphql/schema");

const resolvers = require("./graphql/resolvers");


const app = express();

const stripe = require("./stripe");


async function startApolloServer() {

  app.use(auth);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    context: async ctx => {
      return ctx;
    },
    playground: true,
    introspection: true
  });
  server.applyMiddleware({
    app, path: "/", cors: {
      credentials: true,
      origin: (origin, callback) => {
        const whitelist = [
          "https://vebibes.com",
          "https://cms.vevibes.com",
          "https://app.vevibes.com",
          "http://localhost:3000",
          "https://hungry-haibt-0ad691.netlify.app/",
        ];
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.log(origin);
          callback(new Error("Blocked By CORS"))
        }
      }
    }
  });

  await new Promise(resolve => app.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();