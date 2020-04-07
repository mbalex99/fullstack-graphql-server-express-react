# React TypeScript Node Express GraphQL Server Boilerplate

1. Clone this repo
2. Install dependencies with `yarn` or `npm install`
3. Start a hot reloading dev server with `yarn dev` or `npm run dev`
4. Build for distribution with `yarn build` or `npm run build` then run `yarn start` or `npm start`
5. Open browser to `http://localhost:4000`

## Commentary

* The localhost port will be set with the process.env.PORT environment variable. So for example, if you want to run this server command:
```shell
# for development
PORT=5000 npm run dev

# for production
PORT=5000 NODE_ENV=production npm run build && npm run start
```
* Apollo GraphQL server is running on the `/graphql` endpoint 
* Edit the schema at `src/server/schema.graphql`

That's it! Super light weight! 