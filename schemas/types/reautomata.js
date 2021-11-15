const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { reStateType } = require("./restate.js");
const { reTransitionType } = require("./retransition.js");
const reAutomataType = new GraphQLObjectType({
  name: "RE_Automata",
  description: "Automata type for layout algorithm in client",
  fields: () => ({
    nodes: {
      type: GraphQLList(reStateType),
      description: "List of states of automata",
    },
    edges: {
      type: GraphQLList(reTransitionType),
      description: "List of transitions of automata",
    },
    alphabet: {
      type: GraphQLList(GraphQLString),
      description: "List of symbols of automata",
    },
  }),
});
module.exports = {
  reAutomataType,
};
