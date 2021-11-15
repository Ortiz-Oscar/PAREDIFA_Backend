const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const reStateType = new GraphQLObjectType({
  name: "RE_State",
  description: "State type for layout algorithm in client",
  fields: () => ({
    name: { type: GraphQLInt },
    label: { type: GraphQLString },
    initial: { type: GraphQLBoolean },
    final: { type: GraphQLBoolean },
  }),
});
module.exports = {
  reStateType,
};
