const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const reTransitionType = new GraphQLObjectType({
  name: "RE_Transition",
  description: "Transition type for layout algorithm in client",
  fields: () => ({
    source: { type: GraphQLInt },
    target: { type: GraphQLInt },
    symbol: { type: GraphQLString },
  }),
});
module.exports = {
    reTransitionType,
};
