const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { reStateType } = require("./regexstate.js");
const { reTransitionType } = require("./regextransition.js");
/*
 * Description:
 * Custom automata graphQL type to simplify work for layout algorithm in client
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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
