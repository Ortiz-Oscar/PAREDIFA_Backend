const express = require("Express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schemas/schema.js");

const app = express();
const port = 3001;
app.use(cors());
app.get("/", (_, res) => {
  res.send(`<h1>Server running on port ${port}</h1>`);
});
app.use("/gql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(port, () => console.log(`Server running on port ${port}`));
