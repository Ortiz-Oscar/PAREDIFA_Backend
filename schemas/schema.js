const { GraphQLSchema } = require("graphql");
const { query } = require("./querys/query.js");
const { mutation } = require("./mutations/mutation.js");
/*
 * Description:
 * Root schema for graphql endpoint
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const schema = new GraphQLSchema({
  query: query,
  mutation: mutation,
});
module.exports = {
  schema,
};
