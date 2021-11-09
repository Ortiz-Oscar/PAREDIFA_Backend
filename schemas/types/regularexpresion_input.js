const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const regularExpresionType = new GraphQLInputObjectType({
  name: "Regular_Expresion",
  description: "Input object to process a regular expressions send by client",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: "ID of regular expresion",
    },
    checkSintax: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "Check syntax?",
    },
    simpBeforeComp: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "Simplify expression before compiling?",
    },
    RE: {
      type: GraphQLNonNull(GraphQLString),
      description: "Regular expression to compile",
    },
  }),
});

module.exports = { regularExpresionType };
