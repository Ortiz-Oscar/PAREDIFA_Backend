const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
/*
 * Description:
 * Custom transition graphQL type for querys and simplify work for layout algorithm in client
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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
