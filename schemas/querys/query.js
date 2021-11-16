//GraphQL types
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
//Custom types
const { aboutType } = require("../types/about/about.js");
const { automataType } = require("../types/automata/automata.js");
const { regularExpresionType } = require("../types/input/regex_input.js");
const { reAutomataType } = require("../types/regex/regexautomata.js");
//Resolvers
const { sendImage } = require("../../utils/sendImage.js");
const {  getAutomata,  listAllAutomatas,} = require("../../resolvers/automataresolver.js");
const { aboutResolver } = require("../../resolvers/aboutresolver.js");
const { compileRE } = require("../../resolvers/regexresolver.js");
/*
 *
 * Description:
 * Handle mutation querys in graphql schema
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const query = new GraphQLObjectType({
  name: "Query",
  description: "Process automatas, about and regex requests",
  fields: () => ({
    singleAutomata: {
      type: automataType,
      description: "Returns a single automata based on id",
      args: {
        id: { type: GraphQLString, description: "ID of wanted automata" },
      },
      resolve: (_, args) => {
        return getAutomata(args.id);
      },
    },
    allAutomatas: {
      type: GraphQLList(automataType),
      description: "Returns a list of all automatas stored on db",
      resolve: () => listAllAutomatas(),
    },
    sendAutomata: {
      type: GraphQLString,
      description:
        "Sends an email with an image of the automata in base64 to an email direction",
      args: {
        mailAddres: { type: GraphQLString },
        binaryInfo: { type: GraphQLString },
        studentName: { type: GraphQLString },
        studentId: { type: GraphQLString },
        studentSchedule: { type: GraphQLString },
      },
      resolve: (_, args) => sendImage(args),
    },
    compileRE: {
      type: reAutomataType,
      description: "Compiles RE into a DFA",
      args: {
        re: { type: regularExpresionType },
      },
      resolve: (_, args) => compileRE(args.re.RE),
    },
    about: {
      type: aboutType,
      description: "General information about the project",
      resolve: () => aboutResolver(),
    },
  }),
});

module.exports = { query };
