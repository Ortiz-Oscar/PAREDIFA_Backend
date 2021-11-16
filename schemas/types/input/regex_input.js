const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean,} = require("graphql");

/*
 * Description:
 * Custom regex graphQL input type for query parameters
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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
