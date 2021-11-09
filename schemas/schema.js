const { GraphQLSchema } = require("graphql");
const { query } = require("./querys/query.js");
const { mutation } = require("./mutations/mutation.js");
const schema = new GraphQLSchema({
  query: query,
  mutation: mutation,
});
module.exports = {
  schema,
};
