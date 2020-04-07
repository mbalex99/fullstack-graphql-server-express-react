import express from "express";
import fs from "fs";
import path from "path";
import { ApolloServer } from "apollo-server-express";
var history = require('connect-history-api-fallback');

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;

const typeDefs: string = fs.readFileSync(
  path.resolve(__dirname, "schema.graphql"),
  { encoding: "utf8" }
);
// Construct a schema, using GraphQL schema language

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// important that this is registered here
server.applyMiddleware({ app });


// catch all to render the client
if (NODE_ENV == "development") {
  const webpack = require("webpack");
  const config = require("../../webpack.config.js");
  const middleware = require("webpack-dev-middleware");
  const compiler = webpack(config);
  app.use(history());
  app.use(
    middleware(compiler, {
      // webpack-dev-middleware options
      hot: true,
      noInfo: true,
      historyApiFallback: true,
      publicPath: config.output.publicPath,
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}
if (NODE_ENV === "production") {
  app.use(history())
  app.use('/', express.static('dist/client'))
}

app.listen({ port: PORT }, () => {
  console.log(`🚓 Server ready at http://localhost:${PORT}`);
  console.log(
    `🚀 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
