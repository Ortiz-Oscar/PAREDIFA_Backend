const { GraphQLString, GraphQLObjectType } = require("graphql");
/*
 * Description:
 * Custom team graphQL type for about type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const teamType = new GraphQLObjectType({
    name: "Team",
    description: "Team info of the project",
    fields: () => ({
      id: { type: GraphQLString, description: "ID of development team" },
    }),
});
module.exports = {
    teamType
}