const {  GraphQLObjectType, GraphQLList } = require("graphql");
const { authorType } = require("./author.js")
const { teamType } = require("./team.js")
const { courseType } = require("./course.js")
const { termType } = require("./term.js")
const { versionType } = require("./version.js")
/*
 * Description:
 * Custom about graphQL type for querys
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const aboutType = new GraphQLObjectType({
  name: "About",
  description: "General info about the project",
  fields: () => ({
    authors: { type: GraphQLList(authorType), description:"List of authors of the project" },
    team: { type: teamType, description:"Information of development team" },
    course: { type: courseType },
    term: { type: termType },
    version: { type: versionType },
  }),
});

module.exports = { aboutType };
