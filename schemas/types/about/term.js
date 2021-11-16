const { GraphQLString, GraphQLObjectType } = require("graphql");
/*
 * Description:
 * Custom term graphQL type for about type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const termType = new GraphQLObjectType({
    name: "Term",
    description: "Period when the project was made",
    fields: () => ({
      year: { type: GraphQLString, description: "Year of project development" },
      id: { type: GraphQLString, description: "Period of project development" },
    }),
});
module.exports = {
    termType
}