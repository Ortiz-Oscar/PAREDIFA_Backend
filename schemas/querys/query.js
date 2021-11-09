const { aboutType } = require("../types/about.js");
const { automataType } = require("../types/automata.js");
const { regularExpresionType } = require("../types/regularexpresion_input.js");

const { sendImage } = require("../../utils/sendImage.js");
const {
  getAutomata,
  listAllAutomatas,
} = require("../../resolvers/automataresolver.js");
const { aboutResolver } = require("../../resolvers/aboutresolver.js");

const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const query = new GraphQLObjectType({
  name: "Query",
  description: "Handle",
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
      type: automataType,
      description: "Compiles REs into DFA",
      args: {
        re: { type: regularExpresionType },
      },
    },
    about: {
      type: aboutType,
      description: "General information about the project",
      resolve: () => aboutResolver(),
    },
  }),
});

module.exports = { query };
