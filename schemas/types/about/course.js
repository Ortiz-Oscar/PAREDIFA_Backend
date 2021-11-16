const { GraphQLString, GraphQLObjectType } = require("graphql");
/*
 * Description:
 * Custom course graphQL type for about type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const courseType = new GraphQLObjectType({
    name: "Course",
    description: "Course info of the project",
    fields: () => ({
      id: { type: GraphQLString, description:"Course ID" },
      crn: { type: GraphQLString, description:"Course CRN" },
      name: { type: GraphQLString, description:"Course name" },
      professor: { type: GraphQLString, description:"Professor name" },
      college: { type: GraphQLString, description:"College name" },
    }),
});
module.exports = {
    courseType
}