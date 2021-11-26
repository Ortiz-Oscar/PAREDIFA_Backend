const {  GraphQLObjectType,  GraphQLString,  GraphQLInt,  GraphQLBoolean,} = require("graphql");
/*
 * Description:
 * Custom state graphQL type to simplify work for layout algorithm in client
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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
