const express = require("Express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schemas/schema.js");
const app = express();
const port = 3001;
/*
 * Description:
 * Main file of Express server
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
app.use(cors());
app.get("/", (_, res) => {
  res.send(`<h1>Server running on port ${port}</h1>`);
});
app.use("/gql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(port, () => console.log(`Server running on port ${port}`));
